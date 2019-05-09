import BaseRepository from './baseRepository';

export default class ProjectsRepository extends BaseRepository {
  async findOne(conditions) {
    return this._collection.findOne(conditions);
  }

  async find(conditions) {
    return this._collection.find(conditions);
  }

  async update(id, entity) {
    return this._collection.findOneAndUpdate({ project_id: id }, entity);
  }

  async create(entity) {
    return this._collection.create(entity);
  }
}
