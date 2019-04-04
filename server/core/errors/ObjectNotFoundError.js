import httpStatus from 'http-status-codes';

export default class ObjectNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpStatus= httpStatus.NOT_FOUND;
    this.code = 'not_found';
    Error.captureStackTrace(this, this.constructor);
  }
}