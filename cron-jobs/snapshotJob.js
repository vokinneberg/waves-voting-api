import { ProjectModel, ProjectVerificationStatus, VoteStatus } from '../models/project';

export default class SnapshotJob {
  constructor(logger, config, wavesHelper) {
    this._logger = logger;
    this._config = config;
    this._wavesHelper = wavesHelper;
  }

  async run() {
    try {
      this._logger.info(`Cron-job SnapshotJob started.`);

      const projects = await ProjectModel.find({
        verification_status: ProjectVerificationStatus.Described,
      });

      this._logger.info(`${projects.length} projects found.`);

      await Promise.all(
        projects.map(async project => {
          this._logger.info(`Current project ${project.project_id} rank ${project.rank}.`);

          const votes = await Promise.all(
            project.votes.map(async vote => {
              const stake = await this._wavesHelper.checkAssetStake(
                vote.waves_address,
                this._config.votingAssetId
              );
              this._logger.info(`Waves wallet ${vote.waves_address} stake ${stake}.`);
              const currentVoteRank = Math.log(stake).toFixed(2);
              this._logger.info(`Current vote rank ${currentVoteRank}.`);
              switch (vote.status) {
                case VoteStatus.Init:
                  if (vote.transaction_id) {
                    const transaction = await this._wavesHelper.checkTransaction(
                      vote.transaction_id
                    );
                    if (!transaction) {
                      this._logger.error(
                        `Transaction ${
                          vote.transaction_id
                        } not found in blockchain. Skip processing.'`
                      );
                      break;
                    }
                    if (stake < this._config.votingMinumumStake) {
                      this._logger.info('Not enough funds to confirm vote.');
                      vote.status = VoteStatus.NoFunds;
                    } else {
                      this._logger.info(
                        `Set vote ${vote.waves_address} rank ${currentVoteRank} to Settled.`
                      );
                      vote.rank = currentVoteRank;
                      vote.status = VoteStatus.Settled;
                    }
                  } else {
                    this._logger.info(
                      `No transaction for vote with address ${vote.waves_address}.`
                    );
                  }
                  break;
                case VoteStatus.NoFunds:
                  if (stake < this._config.votingMinumumStake) {
                    this._logger.info('Not enough funds to confirm vote.');
                  } else {
                    this._logger.info(
                      `Set set vote ${vote.waves_address} rank ${currentVoteRank} to Settled.`
                    );
                    vote.rank = currentVoteRank;
                    vote.status = VoteStatus.Settled;
                  }
                  break;
                case VoteStatus.Settled:
                  if (stake < this._config.votingMinumumStake) {
                    this._logger.info('Not enough funds. Revoke vote.');
                    vote.rank = 0;
                    vote.status = VoteStatus.NoFunds;
                  }
                  break;
                default:
                  this._logger.error('Unknown vote status.');
              }
              return vote;
            })
          );

          this._logger.info(JSON.stringify(votes));

          // Update project.
          const allVotes = votes.reduce((x, y) => ({
            rank: parseFloat(x.rank) + parseFloat(y.rank),
          }));
          if (project.rank !== allVotes.rank) {
            let prjVerStatus = project.verification_status;
            if (allVotes.rank >= this._config.votingMaximumRank) {
              prjVerStatus = ProjectVerificationStatus.Verified;
              this._logger.info(`Project ${project.project_id} Verified.`);
            }
            await ProjectModel.findOneAndUpdate(
              { project_id: project.project_id },
              {
                $set: {
                  rank: allVotes.rank,
                  verification_status: prjVerStatus,
                  votes,
                },
              }
            );
            this._logger.info(
              `Project ${project.project_id} rank ${project.rank} changed to ${allVotes.rank}.`
            );
          }
        })
      );

      this._logger.info(`Cron-job SnapshotJob finished.`);
    } catch (error) {
      this._logger.error(`SnapshotJob execution Error: ${error}.`);
    }
  }
}
