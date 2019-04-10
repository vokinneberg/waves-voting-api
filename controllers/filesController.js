import HttpCodes from 'http-status-codes';
import Base64Helper from '../core/utils/base64';
import BaseController from './baseController';

export default class FilesController extends BaseController {
  constructor(minio, logger, config) {
    super(logger, config);
    this._minioClient = minio;
  }

  async upload(req, res, next) {
    try {
      const fileName = new Base64Helper().generateUniqueString();
      await this._minioClient.putObject('trustamust', fileName, req.file.buffer);
      res.status(HttpCodes.CREATED).json({'file':fileName});
    } catch (err) {
      this._logger.error(err);
      if (err.name === 'S3Error') {
        err.status = HttpCodes.BAD_REQUEST;
        err.code = 'file_error';
        err.message = `Unable to upload file ${reg.fileName}.`;
      }
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const stream = await this._minioClient.getObject('trustamust', req.params.name);
      stream.pipe(res);
    } catch (err) {
      this._logger.error(err);
      if (err.name === 'S3Error') {
        err.status = HttpCodes.BAD_REQUEST;
        err.code = 'file_error';
        err.message = `File does not exists.`;
      }
      next(err);
    }
  }
}