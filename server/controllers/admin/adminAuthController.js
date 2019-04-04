import bcrypt from 'bcrypt';
import HttpCodes from 'http-status-codes';
import BaseController from '../baseController';
import UserModel from '../../models/user';
import UnauthorizedError from '../../core/errors/UnauthorizedError';
import ObjectNotFoundError from '../../core/errors/ObjectNotFoundError';

export default class AdminAuthController extends BaseController {
  constructor(logger, config, jwtUtils) {
    super(logger, config)
    this._jwtUtils = jwtUtils;
  }

  async auth(req, res, next) {
    try {
      if (!req.body || req.body == "") {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'body',
          description: 'Request body is empty or wrong formated.'
        });
      }

      const email = req.body.email;
      const password = req.body.password;

      if (!email) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'email',
          description: 'Email is empty or wrong formated.'
        });
      }

      if (!password) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'password',
          description: 'Password is empty or wrong formated.'
        });
      }

      const user = await UserModel.findOne({email: email});
      if (!user) {
        throw new ObjectNotFoundError(`User email:${email} not found`);
      } else {
        const match = await bcrypt.compare(password, user.hashedPassword);

        if (!match)
          throw new UnauthorizedError('Wrong password!');

        const token = this._jwtUtils.generateToken(user);
        res.status(HttpCodes.OK).json({'JWT': token});
      }
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }
}