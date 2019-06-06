import URL from 'url';
/* eslint import/no-unresolved: 0 */
import { data, broadcast } from '@waves/waves-transactions';
import Base64Helper from './base64';

// TODO: Does not work with import. Fix later.
const WavesAPI = require('@waves/waves-api');
const sg = require('@waves/signature-generator');

const TokenStatus = {
  Verified: 2,
  Described: 1,
  Unknown: 0,
  Suspicious: -1,
  Dangerous: -2,
};

const WavesTransactionType = {
  Data: 12,
};

export default class WavesHelper {
  constructor(logger, config, jwtUtil) {
    this._logger = logger;
    this._config = config;
    this._waves = WavesAPI.create(
      this._config.nodeEnv === 'development' ? WavesAPI.TESTNET_CONFIG : WavesAPI.MAINNET_CONFIG
    );
    this._crypto = sg.utils.crypto;
    this._base58 = sg.libs.base58;
    this._jwt = jwtUtil;

    const { StringWithLength } = sg;
    /* eslint new-cap: ['error', { 'newIsCap': false }] */
    this._generator = new sg.generate([
      new StringWithLength('prefix'),
      new StringWithLength('host'),
      new StringWithLength('data'),
    ]);
  }

  async writeVerificationData(project) {
    this._logger.info('Create verification data transaction.');

    let svgLogoData = '';
    if (project.token.svg_logo.data) {
      svgLogoData = `data:image/svg+xml;base64,${Base64Helper.svgToBase64(
        project.token.svg_logo.data
      )}`;
    }

    const verifiedAssetData = [
      {
        key: `version_<${project.token.id}>`, // token ID
        type: 'integer',
        value: 0,
      },
      {
        key: `status_<${project.token.id}>`, // token ID
        type: 'integer',
        value: TokenStatus.Verified, // status
      },
      {
        key: `link_<${project.token.id}>`,
        type: 'string',
        value: project.project_site, // project site
      },
      {
        key: `email_<${project.token.id}>`,
        type: 'string',
        value: project.owner.email, // project contact email
      },
      {
        key: `description_<en>_<${project.token.id}>`,
        type: 'string',
        value: project.token.description, // brief project description
      },
      {
        key: `ticker_<${project.token.id}>`,
        type: 'string',
        value: project.token.ticker, // assigned project ticker
      },
      {
        key: `logo_<${project.token.id}>`,
        type: 'string',
        value: `${svgLogoData}`, // project logo
      },
    ];

    this._logger.info('Asset block described.');
    const verificationData = {
      type: WavesTransactionType.Data,
      data: verifiedAssetData,
      timestamp: new Date().getTime(),
      sender: this._config.dataProviderId,
    };
    this._logger.info('Transaction data composed.');
    const signedVerificationTransction = data(
      verificationData,
      "TrustAmust Platform — 1'st crowdfunding incubator on the blockchain."
    );
    this._logger.info(`Data transaction ${signedVerificationTransction.id} signed.`);
    const resp = await broadcast(signedVerificationTransction, this._config.wavesNodeAddress);
    this._logger.info(`Data transaction ${resp.id} sent to blockchain.`);
    return resp.id;
  }

  async checkAssetStake(wavesAddress, assetId) {
    const assetInfo = await this._waves.API.Node.assets.balance(wavesAddress, assetId);
    this._logger.info(JSON.stringify(assetInfo));
    // TODO: Get rid of magic number 1. There should be used decimals property of asset.
    return (assetInfo.balance / (1 * 10)).toFixed(1);
  }

  async checkTransaction(transactionId) {
    return this._waves.API.Node.transactions.get(transactionId);
  }

  async checkValidity(url) {
    // Get redirect url and parse it.
    const signedData = {
      host: this._config.serverHost,
      data: this._config.authData,
    };
    this._logger.info(`Signed data ${JSON.stringify(signedData)}`);

    const parsedUrl = URL.parse(url, true);

    const signature = parsedUrl.query.s;
    this._logger.info(`Signature ${signature}`);

    const publicKey = parsedUrl.query.p;
    this._logger.info(`PublicKey ${publicKey}`);

    const walletAddress = parsedUrl.query.a;
    this._logger.info(`Wallet address ${walletAddress}`);

    try {
      return this._authValidate(signedData, signature, publicKey);
    } catch (err) {
      this._logger.error(`Signature validation error: ${err}.`);
      return false;
    }
  }

  addressValidate(publicKey, address) {
    const addressFromPublicKey = this._waves.tools.getAddressFromPublicKey(publicKey);
    return addressFromPublicKey === address;
  }

  async _authValidate(authData, sign, publicKey) {
    const prefix = 'WavesWalletAuthentication';

    const byteGen = new this._generator({
      prefix,
      host: authData.host,
      data: authData.data,
    });

    const bytes = await byteGen.getBytes();
    return this._crypto.isValidSignature(bytes, sign, publicKey);
  }
}
