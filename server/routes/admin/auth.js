import logger from '../core/logger';
import config from '../core/config';
import AuthController from '../controllers/authController';

const authController = new AuthController(logger, config);

export default (router) => {
  /* Auth user with Waves wallet */
  router
    .route('/vote')
    .get(authController.wavesAuthSuccess.bind(authController));
};
