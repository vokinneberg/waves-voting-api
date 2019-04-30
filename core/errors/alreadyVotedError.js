import httpStatus from 'http-status-codes';

export default class AlreadyVotedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = httpStatus.BAD_REQUEST;
    this.code = 'already_voted';
    Error.captureStackTrace(this, this.constructor);
  }
}