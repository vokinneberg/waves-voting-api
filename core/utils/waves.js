import URL from 'url';
import JWTUtil from './jwt';

// TODO: Does not work with import. Fix later.
const WavesAPI = require('@waves/waves-api');
const sg = require('@waves/signature-generator');

export default class WavesHelper {
  constructor(logger, config) {
    this._logger = logger;
    this._config = config;
    this._waves = WavesAPI.create(this._config.nodeEnv === 'development' ? WavesAPI.TESTNET_CONFIG : WavesAPI.MAINNET_CONFIG);
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

  _checkValidity(url) {
    // Get redirect url and parse it.
    const signedData = {
      host: this._config.serverHost,
      data: this._config.authData,
    };
    this._logger.info(`Signed data ${signedData}`);

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
      this._logger.error(`Signature validation error: ${err}`);
      return false;
    }
  }

  _authValidate(data, sign, publicKey) {
    const prefix = 'WavesWalletAuthentication';

    const byteGen = new this._generator({
      prefix,
      host: data.host,
      data: data.data,
    });

    return byteGen.getBytes()
      .then(bytes => this._crypto.isValidSignature(bytes, sign, publicKey));
  }

  _addressValidate(publicKey, address) {
    const publicKeyBytes = this._base58.decode(publicKey);
    const addressFromPublicKey = this._crypto.buildRawAddress(publicKeyBytes);

    return (addressFromPublicKey === address);
  }
}
