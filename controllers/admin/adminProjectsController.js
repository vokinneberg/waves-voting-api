import HttpCodes from 'http-status-codes';
import ProjectsController from '../projectsController';
import ObjectNotFoundError from '../../core/errors/objectNotFoundError';
import RequestValidationError from '../../core/errors/requestValidationError';
import { ProjectModel, ProjectVerificationStatus } from '../../models/project';

export default class AdminProjectsController extends ProjectsController {
  async all(req, res, next) {
    try {
      const projects = await ProjectModel.find({});

      this._logger.info(projects);
      res.status(HttpCodes.OK).json({
        projects: projects.map(project => ({
          name: project.name,
          project_id: project.project_id,
          owner: project.owner,
          rank: project.rank,
          verification_status: project.verification_status,
          created_at: project.created_at,
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  async confirm(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      this._logger.info(`Confirm project ${id}.`);
      const project = await this._projectsRepository.findOne({ project_id: id });

      if (!project) {
        throw new ObjectNotFoundError(`Project ${id} not found.`);
      } else {
        project.verification_status = ProjectVerificationStatus.Described;
        project.save();
        res.status(HttpCodes.OK).json(project.toJSON());
      }
    } catch (err) {
      next(err);
    }
  }

  async reject(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      this._logger.info(`Reject project ${id}.`);
      const project = await ProjectModel.findOne({ project_id: id });

      if (!project) {
        throw new ObjectNotFoundError(`Project ${id} not found.`);
      } else {
        project.verification_status = ProjectVerificationStatus.Suspicious;
        project.save();
        res.status(HttpCodes.OK).json(project.toJSON());
      }
    } catch (err) {
      next(err);
    }
  }

  async revoke(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      this._logger.info(`Reject project ${id}.`);
      const project = await ProjectModel.findOne({ project_id: id });

      if (!project) {
        throw new ObjectNotFoundError(`Project ${id} not found.`);
      } else {
        project.verification_status = ProjectVerificationStatus.Unknown;
        project.save();
        res.status(HttpCodes.OK).json(project.toJSON());
      }
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      if (!req.body || req.body === '') {
        throw new RequestValidationError('Request body should not be empty.', 'body');
      }

      const project = await ProjectModel.findOne({ project_id: id });

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
        project.save(err => {
          if (err) throw err;
          res.status(HttpCodes.OK).json(project.toJSON());
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
