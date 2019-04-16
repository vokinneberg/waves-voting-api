import async from 'async';
import { ProjectModel, ProjectVerificationStatus, VoteStatus } from '../models/project';

export default class SnapshotJob {
    constructor(wavesHelper, logger, config) {
        this._logger = logger;
        this._config = config;
        this._wavesHelper = wavesHelper;
    }

    async run() {
        try {
            const projects = await ProjectModel.find({
                status: ProjectVerificationStatus.Described
            });

            this._logger.info(`${projects.length} projects found.`);

            async.forEach(projects, async project => {
                var projectRank = project.rank;
                var projectVotes = project.votes;

                async.forEach(projectVotes, async vote => {
                    const stake = this._wavesHelper.checkAssetStake();
                    const currentVoteRank = Math.log(stake);
                    switch(vote.status) {
                        case VoteStatus.Init:
                            // TODO: Check transtaction in blcokchain and confirm. If not enough WCT set NoFunds status.
                            if (stake < this._config.votingThreshold) {
                                this._logger.info(`Not enough funds to confirm vote.`);
                                vote.status = VoteStatus.NoFunds;
                            }
                            projectRank += currentVoteRank;
                            vote.status = VoteStatus.Settled;
                            break;
                        case VoteStatus.NoFunds:
                            if (stake < this._config.votingThreshold) {
                                this._logger.info(`Not enough funds to confirm vote.`);
                            }
                            projectRank += currentVoteRank;
                            vote.status = VoteStatus.Settled;
                            break;
                        case VoteStatus.Settled:
                            if (stake < this._config.votingThreshold) {
                                this._logger.info(`Not enough funds. Revoke vote.`);
                                projectRank -= currentVoteRank;
                                vote.status = VoteStatus.NoFunds;
                            }
                            break;
                        default:
                            this._logger.info(`Not enough funds to confirm vote.`);
                    }

                    if (project.rank != projectRank) {
                        project.rank = projectRank;
                        project.votes = projectVotes;
                        await project.save();
                    }
                }, (err) => {
                    if (err) throw err;
                });
            }, (err) => {
                if (err) throw err;
            });
        } catch (error) {
            this._logger.error(`SnapshotJob execution Error: ${err}.`);
        }
    }
}