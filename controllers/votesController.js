import HttpCodes from 'http-status-codes';
import { ProjectModel } from '../models/project';
import BaseController from './baseController';
import RequestValidationError from '../core/errors/requestValidationError';

export default class ProjectsController extends BaseController {
  async update(req, res, next) {
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

      this._logger.info(`Updating project ${projectId} vote with vaves address ${wavesAddress}.`);
      const project = await ProjectModel.findOneAndUpdate(
        { project_id: projectId, votes: [{ waves_address: wavesAddress }] },
        {
          $set: {
            transaction_id: req.body.transaction_id,
          },
        },
      );
      res.status(HttpCodes.OK).json(project.toJSON());
    } catch (err) {
      next(err);
    }
  }
}
