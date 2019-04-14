import request from 'request';
import async from 'async';
import logger from '../core/logger';
import config from '../core/config';
import { ProjectModel, ProjectVerificationStatus } from '../models/project';

export default class SnapshotJob {
    constructor(logger, config) {
        this._logger = logger;
        this._config = config;
    }

    async run() {
        try {
            const projects = await ProjectModel.find({
                status: ProjectVerificationStatus.Described
            })

            this._logger.info(`${projects.length} projects found.`)
            async.forEach(projects, (project, callbackProject) => {

                let rankProject = 0
                let updateProjectVotes = false
                let updateVotes = []

                async.forEach(project.votes, (vote, callbackVote) => {

                    request({
                        url: `${this._config.apiBlockchainHost}/assets/balance/${vote.wallet_id}/${this._config.apiAssetsId}`,
                        method: 'get',
                        json: true
                    }, (error, response, body) => {

                        if (!error) {

                            if (body.error) {
                                logger.error('Error response API check voites');
                                return callbackVote()
                            }

                            const balanceApi = body.balance
                            rankProject += config.karma * Math.log(balanceApi)

                            if ((balanceApi != vote.stake) || (balanceApi < 10 && vote.status != 2)) {

                                updateProjectVotes = true
                                let newStatus = 1
                                let newBalance = vote.stake

                                if (balanceApi != vote.stake) {
                                    newBalance = balanceApi
                                }
                                if (balanceApi < 10) {
                                    newStatus = 2
                                }

                                vote.stake = newBalance
                                vote.status = newStatus
                                updateVotes.push(vote)

                                callbackVote()
                            } else {

                                updateVotes.push(vote)
                                callbackVote()
                            }
                        } else {
                            logger.error('Request API voites', {
                                'message': error.message,
                                'stack': error.stack
                            });
                            callbackVote()
                        }
                    })
                }, error => {

                    if (!error) {

                        if (updateProjectVotes) {

                            let verificationStatus = project.verification_status

                            if (rankProject >= 100) {
                                verificationStatus = ProjectVerificationStatus.Verified
                            }

                            ProjectModel.findOneAndUpdate(
                                {
                                    project_id: project.project_id
                                }, {
                                    $set: {
                                        rank: rankProject,
                                        votes: updateVotes,
                                        verification_status: verificationStatus
                                    }
                                }, (error, update) => {

                                    if (!error) {

                                        if (update.nModified === 1) {

                                            callbackProject()
                                        } else {

                                            callbackProject()
                                        }
                                    } else {
                                        console.error(error)
                                    }
                                })
                        } else {
                            callbackProject()
                        }
                    } else {
                        logger.error('Async check voites', {
                            'message': error.message,
                            'stack': error.stack
                        });
                        callbackProject()
                    }
                })
            }, error => {

                if (!error) {

                    logger.info("Successfully check projects");
                } else {
                    logger.error('Async check projects', {
                        'message': error.message,
                        'stack': error.stack
                    });
                }
            })

        } catch (error) {

            logger.error('Catch check projects', {
                'message': error.message,
                'stack': error.stack
            });
        }
    }
}