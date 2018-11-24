import logger from '../core/logger/logger';
import ProjectsController from '../controllers/projectsController';

const projectsContoller = new ProjectsController(logger);

export default (router) => {
  router
    .route('/projects')
    .get(projectsContoller.getAll);

  router
    .route('/projects/:id')
    .get(projectsContoller.getOne);
};
