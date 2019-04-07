import logger from '../core/logger';
import config from '../core/config';
import ProjectsController from '../controllers/projectsController';
import WavesHelper from '../core/utils/waves';

const wavesHelper = new WavesHelper(logger, config);
const projectsContoller = new ProjectsController(logger, config, wavesHelper);

export default (router) => {
  router
    .route('/projects')
    .get(projectsContoller.all.bind(projectsContoller));

  router
    .route('/projects/:id')
    .get(projectsContoller.byId.bind(projectsContoller));

  router
    .route('/projects')
    .post(projectsContoller.create.bind(projectsContoller));

  router
    .route('/projects/:id/vote')
    .get(projectsContoller.vote.bind(projectsContoller));
};
