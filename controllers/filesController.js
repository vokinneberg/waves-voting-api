import HttpCodes from 'http-status-codes';
import BaseController from './baseController';

export default class FilesController extends BaseController {
  constructor(logger, config, filesRepository) {
    super(logger, config);
    this._filesRepository = filesRepository;
  }

  async upload(req, res, next) {
    try {
      const file = await this._filesRepository.create(req.file.buffer);
      res.status(HttpCodes.CREATED).json({ file: file.name });
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const file = await this._filesRepository.get(req.params.name);
      res.set('Content-Type', file.mime_type);
      file.stream.pipe(res);
    } catch (err) {
      next(err);
    }
  }
}
