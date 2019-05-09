import mongoose from 'mongoose';
import httpStatus from 'http-status-codes';
import DatabaseError from '../errors/databaseError';
import ObjectNotFoundError from '../errors/objectNotFoundError';
import BlockchainError from '../errors/blockchainError';

export default class ErrorHandler {
  static handleError(options) {
    return (err, req, res, next) => {
      if (err) {
        if (options.logger) {
          options.logger.error(`${err.name} - ${err.message}. Stack trace: ${err.stack}.`);
        }
        let error = err;
        if (err instanceof mongoose.Error || err.name === 'MongoError') {
          error = new DatabaseError(err.message);
        }
        if (err.name === 'S3Error') {
          error = new ObjectNotFoundError(err.message);
        }
        if (err.name === 'WavesRequestError' || err.name === 'WavesError') {
          error = new BlockchainError(err.message);
        }
        if (error.status) {
          res.status(error.status).send({ code: error.code, message: error.message });
        } else {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ code: 'internal_error', message: 'Something went wrong!' });
        }
      }
      next();
    };
  }
}
