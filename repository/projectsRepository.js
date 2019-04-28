import BaseRepository from './baseRepository';

export default class ProjectsRepository extends BaseRepository {
    async findByProjectId(projectId) {
        return this._collection.findOne({ project_id: projectId });
    }
}
