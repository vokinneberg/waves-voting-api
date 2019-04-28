import async from 'async';
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

            async.forEach(
                projects,
                async project => {
                    let projectRank = project.rank;
                    const projectVotes = project.votes;

                    async.forEach(
                        projectVotes,
                        async vote => {
                            const stake = this._wavesHelper.checkAssetStake(
                                vote.waves_address,
                                this._config.votingAssetId
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
                                        if (
                                            stake <
                                            this._config.votingMinumumStake
                                        ) {
                                            this._logger.info(
                                                'Not enough funds to confirm vote.'
                                            );
                                            vote.status = VoteStatus.NoFunds;
                                        } else {
                                            projectRank += currentVoteRank;
                                            vote.status = VoteStatus.Settled;
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
                                    if (
                                        stake < this._config.votingMinumumStake
                                    ) {
                                        this._logger.info(
                                            'Not enough funds to confirm vote.'
                                        );
                                    } else {
                                        projectRank += currentVoteRank;
                                        vote.status = VoteStatus.Settled;
                                    }
                                    break;
                                case VoteStatus.Settled:
                                    if (
                                        stake < this._config.votingMinumumStake
                                    ) {
                                        this._logger.info(
                                            'Not enough funds. Revoke vote.'
                                        );
                                        projectRank -= currentVoteRank;
                                        vote.status = VoteStatus.NoFunds;
                                    }
                                    break;
                                default:
                                    this._logger.error('Unknown vote status.');
                            }
                        },
                        err => {
                            if (err) throw err;
                        }
                    );

                    if (project.rank !== projectRank) {
                        if (projectRank >= this._config.votingMaximumRank) {
                            project.verification_status =
                                ProjectVerificationStatus.Verified;
                        }
                        project.rank = projectRank;
                        project.votes = projectVotes;
                        await project.save();
                    }
                },
                err => {
                    if (err) throw err;
                }
            );

            this._logger.info(`Cron-job SnapshotJob finished.`);
        } catch (error) {
            this._logger.error(`SnapshotJob execution Error: ${error}.`);
        }
    }
}
