import async from 'async';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';
import {
  ProjectModel,
  ProjectVerificationStatus,
  VoteStatus,
} from '../models/project';

export default class SnapshotJob {
  constructor(wavesHelper, logger, config) {
    this._logger = logger;
    this._config = config;
    this._wavesHelper = wavesHelper;
  }

  async run() {
    try {
      const projects = await ProjectModel.find({
        status: ProjectVerificationStatus.Described,
      });

      this._logger.info(`${projects.length} projects found.`);

      async.forEach(
        projects,
        async project => {
          let projectRank = project.rank;
          const projectVotes = project.votes;

          async.forEach(
            projectVotes,
            async vote => {
              const stake = this._wavesHelper.checkAssetStake();
              const currentVoteRank = Math.log(stake);
              switch (vote.status) {
                case VoteStatus.Init:
                  if (vote.transaction_id) {
                    const transaction = await this._wavesHelper.checkTransaction(
                      vote.transaction_id
                    );
                    if (!transaction) {
                      throw new ObjectNotFoundError(
                        `Transaction ${
                          vote.transaction_id
                        } not found in blockchain.'`
                      );
                    }
                    if (stake < this._config.votingMinumumStake) {
                      this._logger.info('Not enough funds to confirm vote.');
                      vote.status = VoteStatus.NoFunds;
                    }
                    projectRank += currentVoteRank;
                    vote.status = VoteStatus.Settled;
                  }
                  break;
                case VoteStatus.NoFunds:
                  if (stake < this._config.votingMinumumStake) {
                    this._logger.info('Not enough funds to confirm vote.');
                  }
                  projectRank += currentVoteRank;
                  vote.status = VoteStatus.Settled;
                  break;
                case VoteStatus.Settled:
                  if (stake < this._config.votingMinumumStake) {
                    this._logger.info('Not enough funds. Revoke vote.');
                    projectRank -= currentVoteRank;
                    vote.status = VoteStatus.NoFunds;
                  }
                  break;
                default:
                  this._logger.info('Not enough funds to confirm vote.');
              }

              if (project.rank !== projectRank) {
                project.rank = projectRank;
                project.votes = projectVotes;
                await project.save();
              }
            },
            err => {
              if (err) throw err;
            }
          );
        },
        err => {
          if (err) throw err;
        }
      );
    } catch (error) {
      this._logger.error(`SnapshotJob execution Error: ${error}.`);
    }
  }
}
