import logger from '../core/logger/logger';
import config from '../core/config/config';
import AuthController from '../controllers/authController';

const authController = new AuthController(logger, config);

export default (router) => {
  /* Auth user with Waves wallet */
  router
    .route('/wavesAuthSuccess')
    .get(authController.wavesAuthSuccess);
};
