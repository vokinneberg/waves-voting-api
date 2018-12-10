/* eslint-disable no-underscore-dangle */
import URL from 'url';
import User from '../models/user';
import JWTUtil from '../core/utils/jwt';
import BaseController from './baseController';

// TODO: Does not work with import. Fix later.
const WavesAPI = require('@waves/waves-api');
const sg = require('@waves/signature-generator');

class AuthController extends BaseController {
  constructor(logger, config) {
    super(logger, config);
    this._waves = WavesAPI.create(WavesAPI.MAINNET_CONFIG);
    this.wavesAuthSuccess = this.wavesAuthSuccess.bind(this);
    this._crypto = sg.utils.crypto;
    this._base58 = sg.libs.base58;
    this._jwt = new JWTUtil(config);

    const { StringWithLength } = sg;
    this._generator = new sg.generate([
      new StringWithLength('prefix'),
      new StringWithLength('host'),
      new StringWithLength('data'),
    ]);
  }

  async wavesAuthSuccess(req, res, next) {
    try {
      this._logger.info(req.url);
      const valid = this._checkValidity(req.url);
      if (valid) {
        this._logger.info('Waves wallet is valid.');
        const parsedUrl = URL.parse(req.url, true);
        const publicKey = parsedUrl.query.p;
        const walletAddress = parsedUrl.query.a;

        const validWallet = this._addressValidate(publicKey, walletAddress);
        if (validWallet) {
          // Find user by waves address. Create new if does not exists.
          let user = User.finByWalletAddress(walletAddress);
          if (!user) {
            this._logger.info('Create new user.');
            user = new User({
              name: 'New user',
              publicKey,
              wavesWalletAddress: walletAddress,
              createdAt: new Date(),
            });
            user = User.addUser(user);
          }
          this._logger.info(`User ${user.name}.`);
          const token = this._jwt.generateToken(user);
          res.redirect(`${this._config.serverHttpMethod}://${this._config.serverHttpHost}/auth?code=${token}&a=${walletAddress}`);
        }
      }
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
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

export default AuthController;
