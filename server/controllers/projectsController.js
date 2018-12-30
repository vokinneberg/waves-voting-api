/* eslint-disable no-underscore-dangle */
import HttpCodes from 'http-status-codes';

import Project from '../models/project';
import BaseController from './baseController';


class ProjectsController extends BaseController {
  async all(req, res, next) {
    try {
      const projects = await Project.find({});
      res.status(HttpCodes.OK).json({
        projects: projects.map((project) => {
          return project.toJSON();
        }),
      });
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const proj = new Project({
        name: req.body.name,
        email: req.body.email,
        tokensCount: req.body.tokensCount,
        description: req.body.description,
        owner: req.body.owner,
      });
      await Project.create(proj, (err, createdProject) => {
        if (!err) {
          this._logger.info(createdProject);
        }
      });
      res.status(HttpCodes.CREATED).json(proj);
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }
}

export default ProjectsController;
