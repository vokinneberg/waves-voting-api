import httpStatus from 'http-status-codes';

export default class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = httpStatus.BAD_REQUEST;
    this.code = 'db_error';
    Error.captureStackTrace(this, this.constructor);
  }
}
