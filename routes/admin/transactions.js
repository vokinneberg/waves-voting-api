import logger from '../../core/logger';
import config from '../../core/config';
import { ProjectSchema } from '../../models/project';
import ProjectsRepository from '../../repository/projectsRepository';
import AdminTransactionsController from '../../controllers/admin/adminTransactionsController';

const projectsRepository = new ProjectsRepository('Project', ProjectSchema);
const adminTransactionsController = new AdminTransactionsController(
  logger,
  config,
  projectsRepository
);

export default adminRouter => {
  adminRouter
    .route('/transactions')
    .get(adminTransactionsController.all.bind(adminTransactionsController));
};
