import HttpCodes from 'http-status-codes';
import BaseController from './baseController';
import RequestValidationError from '../core/errors/requestValidationError';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';

export default class VotesController extends BaseController {
  constructor(logger, config, projectsRepository) {
    super(logger, config);
    this._projectsRepository = projectsRepository;
  }

  async get(req, res, next) {
    try {
      const projectId = req.params.project_id;
      const wavesAddress = req.params.waves_address;
      if (!projectId) {
        throw new RequestValidationError('Project id should not be empty.', 'project_id');
      }
      if (!wavesAddress) {
        throw new RequestValidationError('Waves address should not be empty.', 'waves_address');
      }

      const project = await this._projectsRepository.findOne({
        project_id: projectId,
        votes: {
          $elemMatch: {
            waves_address: wavesAddress,
          },
        },
      });
      if (!project) {
        throw new ObjectNotFoundError(
          `Project with vote from waves address ${wavesAddress} not found.`
        );
      }
      this._logger.info(JSON.stringify(project));

      const vote = project.votes.find(elem => elem.waves_address === wavesAddress);
      if (!vote) {
        throw new ObjectNotFoundError(`Vote from waves address ${wavesAddress} not found.`);
      }

      res.status(HttpCodes.OK).json(JSON.stringify(vote));
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const projectId = req.params.project_id;
      const wavesAddress = req.params.waves_address;
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

      const project = await this._projectsRepository.findOne({
        project_id: projectId,
      });
      if (!project) {
        throw new ObjectNotFoundError(`Project ${projectId} not found.`);
      }

      const voteIndex = project.votes.findIndex(elem => elem.waves_address === wavesAddress);

      if (voteIndex < 0) {
        throw new ObjectNotFoundError(`Vote from waves address ${wavesAddress} not found.`);
      }

      project.votes[voteIndex].transaction_id = req.body.transaction_id;
      await project.save();

      res.status(HttpCodes.OK).json(project.toJSON());
    } catch (err) {
      next(err);
    }
  }
}
