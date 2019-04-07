/* eslint-disable no-underscore-dangle */
class BaseController {
  constructor(logger, config) {
    this._logger = logger;
    this._config = config;
  }
}

export default BaseController;
