import ObjectNotFoundError from '../core/errors/objectNotFoundError';
import {
    ProjectModel,
    ProjectVerificationStatus,
    VoteStatus,
} from '../models/project';

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

            projects.forEach(async project => {
                const origProjectRank = project.rank;
                const projectVotes = project.votes;

                this._logger.info(
                    `Current project ${
                        project.project_id
                    } rank ${origProjectRank}.`
                );

                projectVotes.forEach(async (vote, index) => {
                    const stake = await this._wavesHelper.checkAssetStake(
                        vote.waves_address,
                        this._config.votingAssetId
                    );
                    this._logger.info(
                        `Waves wallet ${vote.waves_address} stake ${stake}.`
                    );
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
                                    this._logger.info(
                                        'Not enough funds to confirm vote.'
                                    );
                                    project.votes[index].status =
                                        VoteStatus.NoFunds;
                                } else {
                                    this._logger.info(
                                        'Updatating project rank and set to Settled.'
                                    );
                                    project.rank += currentVoteRank;
                                    project.votes[index].status =
                                        VoteStatus.Settled;
                                }
                            } else {
                                this._logger.info(
                                    `No transaction for vote with address ${
                                        vote.waves_address
                                    }.`
                                );
                            }
                            break;
                        case VoteStatus.NoFunds:
                            if (stake < this._config.votingMinumumStake) {
                                this._logger.info(
                                    'Not enough funds to confirm vote.'
                                );
                            } else {
                                this._logger.info(
                                    'Updatating project rank and set to Settled.'
                                );
                                project.rank += currentVoteRank;
                                project.votes[index].status =
                                    VoteStatus.Settled;
                            }
                            break;
                        case VoteStatus.Settled:
                            if (stake < this._config.votingMinumumStake) {
                                this._logger.info(
                                    'Not enough funds. Revoke vote.'
                                );
                                project.rank -= currentVoteRank;
                                project.votes[index].status =
                                    VoteStatus.NoFunds;
                            }
                            break;
                        default:
                            this._logger.error('Unknown vote status.');
                    }
                });

                if (project.rank !== origProjectRank) {
                    if (project.rank >= this._config.votingMaximumRank) {
                        project.verification_status =
                            ProjectVerificationStatus.Verified;
                    }

                    this._logger.info(
                        `New project ${project.project_id} rank ${
                            project.rank
                        }.`
                    );
                    const updateCount = await ProjectModel.findOneAndUpdate(
                        { project_id: project.project_id },
                        project
                    );
                    this._logger.info(`Update count ${updateCount}.`);
                }
            });

            this._logger.info(`Cron-job SnapshotJob finished.`);
        } catch (error) {
            this._logger.error(`SnapshotJob execution Error: ${error}.`);
        }
    }
}
