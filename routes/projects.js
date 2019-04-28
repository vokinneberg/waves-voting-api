import logger from '../core/logger';
import config from '../core/config';
import { ProjectSchema } from '../models/project';
import ProjectsRepository from '../repository/projectsRepository';
import ProjectsController from '../controllers/projectsController';
import WavesHelper from '../core/utils/waves';
import JWTHelper from '../core/utils/jwt';

const projectsRepository = new ProjectsRepository('Project', ProjectSchema);
const jwtHelper = new JWTHelper(config);
const wavesHelper = new WavesHelper(logger, config);
const projectsContoller = new ProjectsController(
    logger,
    config,
    projectsRepository,
    wavesHelper,
    jwtHelper
);

export default router => {
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
