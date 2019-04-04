import HttpCodes from 'http-status-codes';

import { ProjectModel, ProjectVerificationStatus, StartingProjectRank } from '../models/project';
import BaseController from './baseController';
import ObjectNotFoundError from '../core/errors/ObjectNotFoundError';

export default class ProjectsController extends BaseController {
  constructor(logger, config, wavesHelper) {
    super(logger, config)
    this._wavesHelper = wavesHelper;
  }

  async all(req, res, next) {
    try {
      const projects = await ProjectModel.where('verification_status')
      .in([ProjectVerificationStatus.Described, ProjectVerificationStatus.Verified])
      .exec();

      this._logger.info(projects);
      res.status(HttpCodes.OK).json({
        projects: projects.map((project) => {
          this._logger.info(typeof project);
          return {
            _id: project._id,
            name: project.name,
            short_descripton: project.short_description,
            project_site: project.project_site,
            token: {
              id: project.token.id,
              ticker: project.token.ticker,
              description: project.token.description,
              logo: {
                name: project.token.logo.name,
                link: project.token.logo.link
              }
            },
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

      const project = await ProjectModel.findById(id);

      if (!project) {
        throw new ObjectNotFoundError(`Project _id ${id} not found.`);
      } else {
        res.status(HttpCodes.OK).json(project.toJSON())
      }
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async create(req, res, next) {
    try {

      const proj = new ProjectModel({
        name: req.body.name,
        project_id: req.body.project_id,
        short_description: req.body.short_description,
        description: req.body.description,
        project_site: req.body.home_page,
        project_status: req.body.project_status,
        monetization_type: req.body.monetization_type,
        social_links: req.body.social_links,
        token: req.body.token,
        team: req.body.team,
        owner: req.body.owner,
        rank: StartingProjectRank,
        verification_status: ProjectVerificationStatus.Unknown
      });

      const newProj = await ProjectModel.create(proj);
      this._logger.info(`Project created: ${newProj}.`);
      res.status(HttpCodes.CREATED).json(newProj.toJSON());
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }

  async vote(req, res, next) {
    try {
      this._logger.info(req.url);
      const valid = this._checkValidity(req.url);
      if (valid) {
        this._logger.info('Waves wallet is valid.');
        const parsedUrl = URL.parse(req.url, true);
        const publicKey = parsedUrl.query.p;
        const walletAddress = parsedUrl.query.a;

        const validWallet = this._addressValidate(publicKey, walletAddress);
        if (validWallet) {
          //TODO: Check WCT stake and if greater than 10 write it to the Project and recalculate project rank. 

          res.redirect(`${this._config.serverHttpMethod}://${this._config.serverHttpHost}/auth?code=${token}&a=${walletAddress}`);
        }
      }
    } catch (err) {
      this._logger.error(err);
      next(err);
    }
  }
}
