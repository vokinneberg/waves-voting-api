import BaseController from './baseController';

class ProjectsController extends BaseController {
  async getAll(req, res, next) {
    try {
      res.send([]);
    } catch (err) {
      thgis._logger.error(err);
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      res.send({});
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}

export default ProjectsController;
