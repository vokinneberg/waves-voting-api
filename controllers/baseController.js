/* eslint-disable no-underscore-dangle */
export default class BaseController {
    constructor(logger, config) {
        this._logger = logger
        this._config = config
    }
}
