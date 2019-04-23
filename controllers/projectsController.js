import HttpCodes from 'http-status-codes';
import {
  ProjectModel, ProjectVerificationStatus, StartingProjectRank, VoteStatus,
} from '../models/project';
import BaseController from './baseController';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';
import RequestValidationError from '../core/errors/requestValidationError';

export default class ProjectsController extends BaseController {
  constructor(logger, config, wavesHelper, jwtHelper) {
    super(logger, config);
    this._wavesHelper = wavesHelper;
    this._jwtHelper = jwtHelper;
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
            name: project.name,
            project_id: project.project_id,
            short_descripton: project.short_description,
            project_site: project.project_site,
            token: {
              id: project.token.id,
              ticker: project.token.ticker,
              description: project.token.description,
              logo: {
                name: project.token.logo.name,
                link: project.token.logo.link,
              },
            },
            rank: project.rank,
            verification_status: project.verification_status,
          };
        }),
      });
    } catch (err) {
      next(err);
    }
  }

  async byId(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      const project = await ProjectModel.findOne({ project_id: id });

      if (!project) {
        throw new ObjectNotFoundError(`Project ${id} not found.`);
      } else {
        this._logger.info(`Project ${id} found.`);
        res.status(HttpCodes.OK).json(project.toJSON());
      }
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      if (!req.body || req.body === '') {
        throw new RequestValidationError('Request body should not be empty.', 'body');
      }

      // Generate project id.
      const projectId = req.body.name.split(' ').map(str => str.split(/(?=[A-Z])/).join('-').toLowerCase()).join('-');

      const proj = new ProjectModel({
        name: req.body.name,
        project_id: projectId,
        short_description: req.body.short_description,
        description: req.body.description,
        project_site: req.body.project_site,
        project_status: req.body.project_status,
        monetization_type: req.body.monetization_type,
        social_links: req.body.social_links,
        token: req.body.token,
        team: req.body.team,
        owner: req.body.owner,
        rank: StartingProjectRank,
        verification_status: ProjectVerificationStatus.Unknown,
      });

      this._logger.info(`Creating project: ${proj}.`);
      const newProj = await ProjectModel.create(proj);
      this._logger.info(`Project created: ${newProj.project_id}.`);
      res.status(HttpCodes.CREATED).json(newProj.toJSON());
    } catch (err) {
      next(err);
    }
  }

  async vote(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RequestValidationError('Project id should not be empty.', 'id');
      }

      const project = await ProjectModel.findOne({ project_id: id }).where('verification_status')
        .in([ProjectVerificationStatus.Described])
        .exec();

      if (!project) throw new ObjectNotFoundError(`Project ${id} does not exists or in incorrect state.`);

      const valid = this._wavesHelper.checkValidity(req.url);
      if (!valid) {
        throw new RequestValidationError(`Invalid signature.`);
      }

      this._logger.info('Waves wallet is valid.');
      const parsedUrl = URL.parse(req.url, true);
      const publicKey = parsedUrl.query.p;
      const walletAddress = parsedUrl.query.a;

      const validWallet = this._wavesHelper.addressValidate(publicKey, walletAddress);
      if (validWallet) {
        const stake = this._wavesHelper.checkAssetStake(walletAddress, this._config.votingTicker);
        const vote = {
          waves_address: walletAddress,
          stake,
          date: new Date(),
          status: VoteStatus.Init,
        };
        if (stake >= this._config.votingStakeLimit) {
          project.votes.push(vote);
          await project.save();
          res.status(HttpCodes.CREATED).json(
            JSON.stringify(
              {
                ...vote,
                ...{
                  JWT: this._jwtHelper.generateToken({ waves_address: walletAddress },
                    this._config.jwtAdminExpires),
                },
              },
            ),
          );
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
