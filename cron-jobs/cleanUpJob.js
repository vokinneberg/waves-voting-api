import { ProjectVerificationStatus, VoteStatus } from '../models/project';

export default class CleanUpJob {
  constructor(logger, config, projectRepository) {
    this._logger = logger;
    this._config = config;
    this._projectRepository = projectRepository;
  }

  async run() {
    try {
      this._logger.info(`Cron-job CleanUpJob started.`);

      // Get all projects in Described status.
      const projects = await this._projectRepository.find({
        verification_status: ProjectVerificationStatus.Described,
      });

      this._logger.info(`${projects.length} projects found.`);

      await Promise.all(
        projects.map(async project => {
          this._logger.info(`Cleaning up project ${project.project_id}.`);

          // Set expires date.
          const expiresDate = new Date();
          expiresDate.setTime(expiresDate.getTime() - this._config.voteExpires);

          this._logger.info(`Vote expires ${expiresDate}`);

          // Check if there are votes that already expired.
          const votes = project.votes.filter(
            vote =>
              vote.status === VoteStatus.Init &&
              !vote.transaction_id &&
              new Date(vote.created_at) <= expiresDate
          );
          this._logger.info(`Votes to clean up ${votes.length}.`);
          if (votes.length > 0) {
            await Promise.all(
              votes.map(async vote => {
                this._logger.info(
                  `Removing vote from address ${vote.waves_address} as no transaction id presented.`
                );
                // Remove vote if it is expired.
                /* eslint no-underscore-dangle: 0 */
                project.votes.pull(vote._id);
                await project.save();
              })
            );
          }
        })
      );
      this._logger.info(`Cron-job CleanUpJob finished.`);
    } catch (error) {
      this._logger.error(`CleanUpJob execution Error: ${error}.`);
    }
  }
}
