import mongoose from 'mongoose';
import httpStatus from 'http-status-codes';
import DatabaseError from '../errors/databaseError';

export default class ErrorHandler {
  static handleError(options) {
    return function (err, req, res, next) {
      if (err) {
        if (options.logger) {
          options.logger.error(`${err.name} - ${err.message}. Stack trace: ${err.stack}.`);
        }
        let error = err;
        if (err instanceof mongoose.Error) {
          error = new DatabaseError(err.message);
        }
        if (error.status) {
          res.status(error.status).send({ code: error.code, message: error.message });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: 'internal_error', message: 'Something went wrong!' });
      }
      next();
    };
  }
}
