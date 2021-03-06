import httpStatus from 'http-status-codes';

export default class RequestValidationError extends Error {
  constructor(message, parameter) {
    super(message);
    this.name = this.constructor.name;
    this.status = httpStatus.BAD_REQUEST;
    this.parameter = parameter;
    this.code = 'validation_error';
    Error.captureStackTrace(this, this.constructor);
  }
}
