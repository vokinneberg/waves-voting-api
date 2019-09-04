import { ProjectModel, ProjectVerificationStatus, VoteStatus } from '../models/project';

export default class SnapshotJob {
  constructor(logger, config, wavesHelper, filesRepository) {
    this._logger = logger;
    this._config = config;
    this._wavesHelper = wavesHelper;
    this._filesRepository = filesRepository;
  }

  async run() {
    try {
      this._logger.info(`Cron-job SnapshotJob started.`);

      const projects = await ProjectModel.find({
        verification_status: ProjectVerificationStatus.Described,
      });

      this._logger.info(`${projects.length} projects found.`);

      let update = false;
      await Promise.all(
        projects.map(async project => {
          this._logger.info(`Current project ${project.project_id} rank ${project.rank}.`);

          const votes = await Promise.all(
            project.votes.map(async vote => {
              // If there is no transaction id stored for the vote - Skip processing.
              if (!vote.transaction_id) {
                this._logger.info(
                  `No transaction for vote with address ${vote.waves_address}. Skip processing.`
                );
                return vote;
              }

              const transaction = await this._wavesHelper.checkTransaction(vote.transaction_id);

              // If there is no transaction in blockchain - Skip processing.
              if (!transaction) {
                this._logger.error(
                  `Transaction ${vote.transaction_id} not found in blockchain. Skip processing.'`
                );
                return vote;
              }

              // Getting voting asset stake and calculate current vote rank.
              const stake = await this._wavesHelper.checkAssetStake(
                vote.waves_address,
                this._config.votingAssetId
              );
              this._logger.info(`Waves wallet ${vote.waves_address} stake ${stake}.`);

              // If current user stake less then minimum required. Set vote rank to 0 and status to NoFunds.
              if (stake < this._config.votingMinumumStake) {
                this._logger.info('Not enough funds to vote.');
                vote.stake = stake;
                vote.rank = 0;
                vote.status = VoteStatus.NoFunds;
                update = true;
              } else {
                // Otherwise update vote rank to the current and set vote to Settled.
                const currentVoteRank = Math.log10(stake).toFixed(2);
                this._logger.info(
                  `Set set vote ${vote.waves_address} rank ${currentVoteRank} to Settled.`
                );
                vote.stake = stake;
                vote.rank = currentVoteRank;
                vote.status = VoteStatus.Settled;
                update = true;
              }
              return vote;
            })
          );

          // If project rank changed - Update project.
          if (update) {
            // Calculate project rank.
            let allVotes = {};
            if (votes.length > 1) {
              allVotes = votes.reduce((x, y) => ({
                rank: parseFloat(x.rank) + parseFloat(y.rank),
              }));
            } else {
              allVotes.rank = parseFloat(votes[0].rank);
            }

            let prjStatus = project.verification_status;
            let verificationTrxId = '';
            // If project rank reached verification threshold - Update project status to Verified.
            if (allVotes.rank >= this._config.votingMaximumRank) {
              prjStatus = ProjectVerificationStatus.Verified;
              // Get svg logo file to store in blockchain.
              if (project.token.svg_logo) {
                try {
                  const chunks = [];
                  const file = await this._filesRepository.get(project.token.svg_logo.link);
                  /* eslint no-restricted-syntax: [0] */
                  for await (const chunk of file.stream) {
                    chunks.push(chunk);
                  }
                  const fileData = Buffer.concat(chunks);
                  project.token.svg_logo.data = fileData;
                } catch (fileError) {
                  this._logger.error(`File ${project.token.svg_logo.link} not found.`, fileError);
                }
              }
              // Write verificatiob status to blockchain.
              verificationTrxId = await this._wavesHelper.writeVerificationData(project);
              this._logger.info(
                `Project ${project.project_id} ${ProjectVerificationStatus.Verified}.`
              );
            }

            // Check if current project rank is greater than votingMaximumRank and make in equals to votingMaximumRank.
            const prjRank =
              allVotes.rank > this._config.votingMaximumRank
                ? this._config.votingMaximumRank
                : allVotes.rank;
            ProjectModel.findOneAndUpdate(
              { project_id: project.project_id },
              {
                $set: {
                  rank: parseFloat(prjRank).toFixed(2),
                  verification_status: prjStatus,
                  verification_transaction_id: verificationTrxId,
                  votes,
                },
              }
            );
            this._logger.info(
              `Project ${project.project_id} rank ${project.rank} changed to ${parseFloat(
                prjRank
              ).toFixed(2)}.`
            );
          }
        })
      );

      this._logger.info(`Cron-job SnapshotJob finished.`);
    } catch (error) {
      if (error.tx) {
        this._logger.error(`SnapshotJob execution Error: ${JSON.stringify(error)}.`);
      } else {
        this._logger.error(`SnapshotJob execution Error: ${error}.`);
      }
    }
  }
}
