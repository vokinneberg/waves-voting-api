import logger from '../core/logger';
import config from '../core/config';
import ProjectsController from '../controllers/projectsController';

const projectsContoller = new ProjectsController(logger, config);

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
};
