import ProjectsController from "../projectsController";
import { ProjectModel, ProjectVerificationStatus } from "../../models/project";

export default class AdminProjectsController extends ProjectsController {
  async confirm(req, res, next) {
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
          project.verification_status = ProjectVerificationStatus.Described;
          project.save();
          res.status(HttpCodes.OK).json(project.toJSON())
        }
      });

    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      let id = req.params.id;

      if (!id) {
        res.status(HttpCodes.BAD_REQUEST).json({
          code: 'invalid_request',
          parameter: 'id',
          description: 'Project_id is empty or wrong formated.'
        });
      }

      if (!req.body || req.body == "") {

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
          project.name = req.body.name;
          project.short_description = req.body.short_description;
          project.description = req.body.description;
          project.project_site = req.body.home_page;
          project.project_status = req.body.project_status;
          project.social_links = req.body.social_links;
          project.token = req.body.token;
          project.team = req.body.team;
          project.owner = req.body.owner;
          project.save();
          res.status(HttpCodes.OK).json(project.toJSON())
        }
      });

    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }
}