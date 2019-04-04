import httpStatus from 'http-status-codes';

export default class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = httpStatus.UNAUTHORIZED;
    this.code = 'unauthorized';
    Error.captureStackTrace(this, this.constructor);
  }
}