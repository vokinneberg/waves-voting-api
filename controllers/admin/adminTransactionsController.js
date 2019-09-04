import HttpCodes from 'http-status-codes';
import ProjectsController from '../projectsController';

export default class AdminTransactionsController extends ProjectsController {
  constructor(logger, config, projectsRepository) {
    super(logger, config);
    this._projectsRepository = projectsRepository;
  }

  async all(req, res, next) {
    try {
      const projects = await this._projectsRepository.find({});
      this._logger.info(`${projects.length} projects found.`);

      const transactions = projects.reduce(
        (flat, project) =>
          flat.concat(
            project.votes
              .filter(vote => vote.transaction_id)
              .map(vote => {
                return {
                  project_id: project.project_id,
                  transaction_id: vote.transaction_id,
                  waves_address: vote.waves_address,
                  stake: parseFloat(vote.stake).toFixed(1),
                  created_at: vote.created_at,
                };
              })
          ),
        []
      );

      this._logger.debug(transactions);

      res.status(HttpCodes.OK).json(transactions);
    } catch (err) {
      next(err);
    }
  }
}
