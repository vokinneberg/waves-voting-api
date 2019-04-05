import HttpCodes from 'http-status-codes';
import ProjectsController from '../projectsController';
import ObjectNotFoundError from '../../core/errors/objectNotFoundError';
import { ProjectModel, ProjectVerificationStatus } from '../../models/project';

export default class AdminProjectsController extends ProjectsController {
  async all(req, res, next) {
    try {
      const projects = await ProjectModel.where('verification_status')
      .in([ProjectVerificationStatus.Described, ProjectVerificationStatus.Verified, ProjectVerificationStatus.Unknown])
      .exec();

      this._logger.info(projects);
      res.status(HttpCodes.OK).json({
        projects: projects.map((project) => {
          return {
            _id: project._id,
            name: project.name,
            project_id: project.project_id,
            owner: project.owner,
            rank: project.rank,
            verification_status: project.verification_status
          }
        }),
      });
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async confirm(req, res, next) {
    try {
      let id = req.params.id;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      const project = await ProjectModel.findById(id);

      if (!project) {
        throw new ObjectNotFoundError(`Project _id ${id} not found.`);
      } else {
        project.verification_status = ProjectVerificationStatus.Described;
        project.save();
        res.status(HttpCodes.OK).json(project.toJSON())
      }

    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      let id = req.params.id;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      if (!req.body || req.body == "") {
        throw new RequestValidationError('Request body should not be empty.', 'body');
      }

      var project = await ProjectModel.findById(id);

      if (!project) {
        throw new ObjectNotFoundError(`Project ${id} not found.`);
      } else {
        this._logger.info(JSON.stringify(req.body));
        project.name = req.body.name;
        project.project_id = req.body.project_id;
        project.short_description = req.body.short_description;
        project.description = req.body.description;
        project.project_site = req.body.project_site;
        project.monetization_type = req.body.monetization_type;
        project.project_status = req.body.project_status;
        project.social_links = req.body.social_links;
        project.token = req.body.token;
        project.team = req.body.team;
        project.owner = req.body.owner;
        project.save((err) => {
          if (err)
            throw err;
          res.status(HttpCodes.OK).json(project.toJSON())
        })
      }

    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }
}