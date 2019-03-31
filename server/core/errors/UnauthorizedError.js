import httpStatus from 'http-status-codes';

export default class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.code = httpStatus.UNAUTHORIZED;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}