import logger from '../../core/logger';
import config from '../../core/config';
import AdminProjectsController from '../../controllers/admin/adminProjectsController';

const adminProjectsController = new AdminProjectsController(logger, config);

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
    .route('/projects/:id')
    .put(adminProjectsController.update.bind(adminProjectsController));
};
