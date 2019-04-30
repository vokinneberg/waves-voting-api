import httpStatus from 'http-status-codes';

export default class NoFundsError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = httpStatus.BAD_REQUEST;
    this.code = 'no_funds';
    Error.captureStackTrace(this, this.constructor);
  }
}