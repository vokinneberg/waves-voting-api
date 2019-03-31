import logger from '../../core/logger';
import config from '../../core/config';
import AdminAuthController from '../../controllers/admin/adminAuthController';
import JWTUtil from '../../core/utils/jwt';

const jwtUtils = new JWTUtil(config);
const adminAuthController = new AdminAuthController(logger, config, jwtUtils);

export default (adminRouter) => {
  adminRouter
    .route('/auth')
    .post(adminAuthController.auth.bind(adminAuthController));
};
