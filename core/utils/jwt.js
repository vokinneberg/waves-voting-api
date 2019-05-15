import JWT from 'jsonwebtoken';

export default class JWTHelper {
  constructor(jwtSecret) {
    this._jwtSecret = jwtSecret;
  }

  generateToken(payload, lifetime) {
    const token = JWT.sign(payload, this._jwtSecret, {
      expiresIn: lifetime,
    });

    return token;
  }
}
