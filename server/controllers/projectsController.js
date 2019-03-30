/* eslint-disable no-underscore-dangle */
import HttpCodes from 'http-status-codes';

import { ProjectModel, ProjectVerificationStatus } from '../models/project';
import BaseController from './baseController';

class ProjectsController extends BaseController {
  async all(req, res, next) {
    try {
      await ProjectModel.where('status')
      .in([ProjectVerificationStatus.Described, ProjectVerificationStatus.Verified])
      .exec((err, projects) => {
        if (err) {
          throw err;
        }
        this._logger.info(typeof projects)
        this._logger.info(projects);
        res.status(HttpCodes.OK).json({
          projects: projects.map((project) => {
            this._logger.info(typeof project);
            return {
              _id: project._id,
              name: project.name,
              logo: project.logo,
              description: project.description,
              home_page: project.home_page,
              token: project.token,
              rate: project.rate,
              status: project.status
            }
          }),
        });
      });
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async byId(req, res, next) {
    try {
      let id = req.params.id;

      if (!id) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'id',
          description: 'Project_id is empty or wrong formated.'
        });
      }

      await ProjectModel.findById(id, (err, project) => {
        if (err)
          throw err;

        if (!project) {
          res.status(HttpCodes.NOT_FOUND).json({
            code: 'not_found',
            description: 'Project not found.'
          });
        } else {
          res.status(HttpCodes.OK).json(project.toJSON())
        }
      });

    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async create(req, res, next) {
    try {

      const proj = new ProjectModel({
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        owner: req.body.owner,
        country: req.body.country,
        home_page: req.body.home_page,
        token: req.body.token,
        logo: req.body.logo,
        social_links: req.body.social_links,
        papers: req.body.papers,
        votes: req.body.votes,
        rate: req.body.rate,
        status: req.body.status
      });

      await ProjectModel.create(proj, (err, createdProject) => {
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
