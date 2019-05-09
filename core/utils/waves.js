import URL from 'url';
import JWTUtil from './jwt';

// TODO: Does not work with import. Fix later.
const WavesAPI = require('@waves/waves-api');
const sg = require('@waves/signature-generator');

export default class WavesHelper {
  constructor(logger, config) {
    this._logger = logger;
    this._config = config;
    this._waves = WavesAPI.create(
      this._config.nodeEnv === 'development' ? WavesAPI.TESTNET_CONFIG : WavesAPI.MAINNET_CONFIG
    );
    this._crypto = sg.utils.crypto;
    this._base58 = sg.libs.base58;
    this._jwt = new JWTUtil(config);

    const { StringWithLength } = sg;
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this._generator = new sg.generate([
      new StringWithLength('prefix'),
      new StringWithLength('host'),
      new StringWithLength('data'),
    ]);
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

  checkValidity(url) {
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

  _authValidate(data, sign, publicKey) {
    const prefix = 'WavesWalletAuthentication';

    const byteGen = new this._generator({
      prefix,
      host: data.host,
      data: data.data,
    });

    return byteGen.getBytes().then(bytes => this._crypto.isValidSignature(bytes, sign, publicKey));
  }
}
