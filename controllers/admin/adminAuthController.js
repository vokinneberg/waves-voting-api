import bcrypt from 'bcrypt';
import HttpCodes from 'http-status-codes';
import BaseController from '../baseController';
import UserModel from '../../models/user';
import UnauthorizedError from '../../core/errors/unauthorizedError';
import ObjectNotFoundError from '../../core/errors/objectNotFoundError';

export default class AdminAuthController extends BaseController {
  constructor(logger, config, jwtHelper) {
    super(logger, config);
    this.jwtHelper = jwtHelper;
  }

  async auth(req, res, next) {
    try {
      if (!req.body || req.body === '') {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'body',
          description: 'Request body is empty or wrong formated.',
        });
      }

      const { email } = req.body;
      const { password } = req.body;

      if (!email) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'email',
          description: 'Email is empty or wrong formated.',
        });
      }

      if (!password) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'password',
          description: 'Password is empty or wrong formated.',
        });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ObjectNotFoundError(`User email:${email} not found`);
      } else {
        const match = await new Promise((resolve, reject) => bcrypt.compare(
          password, user.hashedPassword, (error, resp) => {
            if (error) { reject(error); }
            resolve(resp);
          },
        ));

        if (!match) throw new UnauthorizedError('Wrong password!');

        const token = this.jwtHelper.generateToken(
          { email: user.email },
          this._config.jwtAdminExpires,
        );
        res.status(HttpCodes.OK).json({ JWT: token });
      }
    } catch (err) {
      next(err);
    }
  }
}
