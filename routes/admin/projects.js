import logger from '../../core/logger';
import config from '../../core/config';
import { ProjectSchema } from '../../models/project';
import ProjectsRepository from '../../repository/projectsRepository';
import AdminProjectsController from '../../controllers/admin/adminProjectsController';

const projectsRepository = new ProjectsRepository('Project', ProjectSchema);
const adminProjectsController = new AdminProjectsController(logger, config, projectsRepository);

export default (adminRouter) => {
  adminRouter
    .route('/projects')
    .get(adminProjectsController.all.bind(adminProjectsController));

  adminRouter
    .route('/projects/:id')
    .get(adminProjectsController.byId.bind(adminProjectsController));

  adminRouter
    .route('/projects/:id/confirm')
    .put(adminProjectsController.confirm.bind(adminProjectsController));

  adminRouter
    .route('/projects/:id/reject')
    .put(adminProjectsController.reject.bind(adminProjectsController));

  adminRouter
    .route('/projects/:id')
    .put(adminProjectsController.update.bind(adminProjectsController));
};
