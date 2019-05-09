import logger from '../../core/logger';
import config from '../../core/config';
import AdminAuthController from '../../controllers/admin/adminAuthController';
import JWTHelper from '../../core/utils/jwt';

const jwtHelper = new JWTHelper(config);
const adminAuthController = new AdminAuthController(logger, config, jwtHelper);

export default adminRouter => {
  adminRouter.route('/auth').post(adminAuthController.auth.bind(adminAuthController));
};
