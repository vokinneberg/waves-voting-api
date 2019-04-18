import HttpCodes from 'http-status-codes';
import { ProjectModel } from '../models/project';
import BaseController from './baseController';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';
import RequestValidationError from '../core/errors/requestValidationError';

export default class ProjectsController extends BaseController {
  constructor(logger, config) {
    super(logger, config);
  }

  update(req, res, next) {
    try {
      const { projectId, wavesAddress } = req.params;
      if (!projectId) {
        throw new RequestValidationError('Project id should not be empty.', 'project_id');
      }
      if (!wavesAddress) {
        throw new RequestValidationError('Waves address should not be empty.', 'waves_address');
      }
      if (!req.body || req.body === '') {
        throw new RequestValidationError('Request body should not be empty.', 'body');
      }

      const project = await Folder.findOneAndUpdate(
        { 'project_id': projectId, 'votes' : [{'waves_address': wavesAddress }]},
        { 
            '$set': {
                'transaction_id': body.transaction_id
            }
        }
      );
      res.status(HttpCodes.OK).json(project.toJSON());
    } catch (err) {
      next(err);
    }
  }
}