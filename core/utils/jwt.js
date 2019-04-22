import JWT from 'jsonwebtoken';

export default class JWTHelper {
  constructor(config) {
    this._config = config;
  }

  generateToken(payload, lifetime) {
    const token = JWT.sign(payload, this._config.jwtSecret, {
      expiresIn: 60 * lifetime,
    });

    return token;
  }
}
