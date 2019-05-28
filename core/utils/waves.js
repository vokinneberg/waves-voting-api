import URL from 'url';
/* eslint import/no-unresolved: 0 */
import { data, broadcast } from '@waves/waves-transactions';

// TODO: Does not work with import. Fix later.
const WavesAPI = require('@waves/waves-api');
const sg = require('@waves/signature-generator');

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
    const verifiedAssetData = [
      {
        key: `version_<${project.token.id}>`, // token ID
        type: 'integer',
        value: 1,
      },
      {
        key: `status_id_<${project.token.id}>`, // token ID
        type: 'integer',
        value: 2, // status
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
        value:
          'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4wLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzODkgNDMwLjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OSA0MzAuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzEzRDE3QTt9DQoJLnN0MXtmaWxsOiMxNEUyODA7fQ0KCS5zdDJ7ZmlsbDojMThBODYzO30NCgkuc3Qze29wYWNpdHk6MC4zO30NCgkuc3Q0e2ZpbGw6I0ZGRkZGRjt9DQoJLnN0NXtmaWxsOiNFNkU2RjQ7fQ0KCS5zdDZ7ZmlsbDpub25lO3N0cm9rZTojMzRCNTc3O3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3Q3e29wYWNpdHk6MC41O2ZpbGw6bm9uZTtzdHJva2U6IzM0QjU3NztzdHJva2UtbWl0ZXJsaW1pdDoxMDtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTkxLjQsMTIuMWwtMjYuMyw3Mi42bC00OCwxMzMuMWw3NC40LDIwMmM0NC41LTE0LjQsODUuMS00Mi4yLDExNC42LTc4LjdjMzUuMy00My42LDUzLjktOTYuNCw1My45LTE1Mi42DQoJVjQzLjhDMzA2LjcsMjMsMjQ4LjcsMTIuMSwxOTEuNCwxMi4xeiIvPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTIzLDQzLjh2MTQ0LjdjMCw1Ni4yLDE4LjcsMTA5LDUzLjksMTUyLjZjMjkuNiwzNi41LDcwLjEsNjQuMywxMTQuNiw3OC43VjEyLjFDMTM0LjQsMTIuMSw3Ni40LDIzLDIzLDQzLjh6Ig0KCS8+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjMsNDMuOHYxNDQuN2MwLDU2LjIsMTguNywxMDksNTMuOSwxNTIuNmMyOS42LDM2LjUsNzAuMSw2NC4zLDExNC42LDc4LjdWMTIuMUMxMzQuNCwxMi4xLDc2LjQsMjMsMjMsNDMuOHoiDQoJLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NC43LDg3LjNMMjg2LDkxLjJsNzQtNDUuMXYtMi4zQzMwNi42LDIzLDI0OC42LDEyLjEsMTkxLjQsMTIuMWMtNTYuOCwwLTExNS41LDExLjItMTY4LjYsMzEuN0w4Mi41LDc1DQoJTDk0LjcsODcuM3oiLz4NCjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yOTkuMSw3NC42TDI4Miw5MmwtOTAuNCwxMDMuNWwtMC4xLDIyNC4yYzQ0LjUtMTQuNCw4NS4xLTQyLjIsMTE0LjYtNzguN2MzNS4zLTQzLjYsNTMuOS05Ni40LDUzLjktMTUyLjYNCglWNDMuN0MzMjguMyw1OC44LDI5OS4xLDc0LjYsMjk5LjEsNzQuNnoiLz4NCjxnPg0KCTxnIGNsYXNzPSJzdDMiPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMjQxLjgsMTY5Ljh2MTg2aC05OS42di0xODZIODIuOFY3NC45aDIxNi4zdjk0LjlMMjQxLjgsMTY5LjhMMjQxLjgsMTY5Ljh6Ii8+DQoJPC9nPg0KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0yODkuNSw3Ni41Ii8+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0yMzEuOCwxNTkuOHYxODZoLTc5LjZ2LTE4Nkg5Mi44Vjg0LjloMTk2LjN2NzQuOUwyMzEuOCwxNTkuOEwyMzEuOCwxNTkuOHoiLz4NCgk8L2c+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0NiIgZD0iTTIzMS44LDE1OS44djE4NmgtNzkuNnYtMTg2SDkyLjhWODQuOWgxOTYuM3Y3NC45TDIzMS44LDE1OS44TDIzMS44LDE1OS44eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxsaW5lIGNsYXNzPSJzdDciIHgxPSI4Mi43IiB5MT0iMTY5LjgiIHgyPSI5Mi43IiB5Mj0iMTU5LjgiLz4NCgk8bGluZSBjbGFzcz0ic3Q3IiB4MT0iMTQyLjIiIHkxPSIxNjkuOCIgeDI9IjE1Mi4yIiB5Mj0iMTU5LjgiLz4NCgk8bGluZSBjbGFzcz0ic3Q2IiB4MT0iMjg5IiB5MT0iODQuOSIgeDI9IjI5OSIgeTI9Ijc0LjkiLz4NCgk8bGluZSBjbGFzcz0ic3Q2IiB4MT0iMjg5IiB5MT0iMTU5LjgiIHgyPSIyOTkiIHkyPSIxNjkuOCIvPg0KCTxsaW5lIGNsYXNzPSJzdDYiIHgxPSIyNDEuOCIgeTE9IjE2OS44IiB4Mj0iMjMyLjIiIHkyPSIxNjAuNCIvPg0KCTxsaW5lIGNsYXNzPSJzdDYiIHgxPSIyNDEuOCIgeTE9IjM1NS44IiB4Mj0iMjMxLjUiIHkyPSIzNDUuOCIvPg0KCTxsaW5lIGNsYXNzPSJzdDciIHgxPSIxNDIuMiIgeTE9IjM1NS44IiB4Mj0iMTUyLjIiIHkyPSIzNDUuOCIvPg0KCTxsaW5lIGNsYXNzPSJzdDYiIHgxPSI5Mi43IiB5MT0iODQuOSIgeDI9IjgyLjciIHkyPSI3NC45Ii8+DQo8L2c+DQo8L3N2Zz4NCg==', // project logo
      },
    ];
    this._logger.info('Asset block described.');
    const verificationData = {
      type: 12,
      data: verifiedAssetData,
      timestamp: new Date().getTime(),
      sender: '3Mvy79q2zLpWBhdZJCqdfH22y5k4JxY4e2L',
      fee: 1000000,
    };
    this._logger.info('Transaction data composed.');
    const signedVerificationTransction = data(
      verificationData,
      "TrustAmust Platform — 1'st crowdfunding incubator on the blockchain."
    );
    this._logger.info(`Data transaction ${signedVerificationTransction.id} signed.`);
    const resp = await broadcast(signedVerificationTransction, 'https://testnodes.wavesnodes.com');
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
