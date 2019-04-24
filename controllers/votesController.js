import HttpCodes from 'http-status-codes';
import { ProjectModel } from '../models/project';
import BaseController from './baseController';
import RequestValidationError from '../core/errors/requestValidationError';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';

export default class ProjectsController extends BaseController {
  async update(req, res, next) {
    try {
      const { project_id, waves_address } = req.params;
      if (!project_id) {
        throw new RequestValidationError('Project id should not be empty.', 'project_id');
      }
      if (!waves_address) {
        throw new RequestValidationError('Waves address should not be empty.', 'waves_address');
      }
      if (!req.body || req.body === '') {
        throw new RequestValidationError('Request body should not be empty.', 'body');
      }

      this._logger.info(`Updating project ${project_id} vote with vaves address ${waves_address}.`);

      const project = await ProjectModel.findOne({ project_id: project_id });
      if (!project) {
        throw new ObjectNotFoundError(`Project ${project_id} not found.`)
      }
      
      let voteIndex = project.votes.findIndex((elem => elem.waves_address ===  waves_address));

      if (voteIndex < 0) {
        throw new ObjectNotFoundError(`Vote from waves address ${waves_address} not found.`)
      }

      project.votes[voteIndex].transaction_id = req.body.transaction_id;
      await project.save();

      res.status(HttpCodes.OK).json(project.toJSON());
    } catch (err) {
      next(err);
    }
  }
}
