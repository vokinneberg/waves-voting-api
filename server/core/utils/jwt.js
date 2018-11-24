/* eslint-disable no-underscore-dangle */
import JWT from 'jsonwebtoken';

export default class JWTUtil {
  constructor(config) {
    this._config = config;
  }

  generateToken(user) {
    const u = {
      name: user.name,
      email: user.email,
      wavesWalletAddress: user.wavesWalletAddress,
      createdAt: user.createdAt,
    };

    const token = JWT.sign(u, this._config.jwtSecret, {
      expiresIn: 60 * 60 * this._config.jwtExpires,
    });

    return token;
  }
}
