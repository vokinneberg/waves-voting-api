import logger from '../core/logger';
import config from '../core/config';
import VotesController from '../controllers/votesController';

const votesContoller = new VotesController(logger, config);

export default router => {
  router
    .route('/projects/:project_id/votes/:waves_address')
    .get(votesContoller.getByWavesAddress.bind(votesContoller));

  router
    .route('/projects/:project_id/votes/:waves_address')
    .put(votesContoller.update.bind(votesContoller));
};
