import logger from '../core/logger';
import config from '../core/config';
import { ProjectSchema } from '../models/project';
import ProjectsRepository from '../repository/projectsRepository';
import VotesController from '../controllers/votesController';

const projectsRepository = new ProjectsRepository('Project', ProjectSchema);
const votesContoller = new VotesController(logger, config, projectsRepository);

export default router => {
  router
    .route('/projects/:project_id/votes/:waves_address')
    .get(votesContoller.get.bind(votesContoller));

  router
    .route('/projects/:project_id/votes/:waves_address')
    .put(votesContoller.update.bind(votesContoller));
};
