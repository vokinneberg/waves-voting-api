import BaseRepository from './baseRepository';

export default class ProjectsRepository extends BaseRepository {
  async findOne(conditions) {
    return this._collection.findOne(conditions).exec();
  }

  async find(conditions) {
    return this._collection.find(conditions).exec();
  }

  async findInStatus(statuses) {
    return this._collection.where('verification_status')
      .in(statuses)
      .exec();
  }

  async findOneInStatus(condition, statuses) {
    return this._collection.findOne(condition)
      .where('verification_status')
      .in(statuses)
      .exec();
  }

  async update(id, entity) {
    return this._collection.findOneAndUpdate({ project_id: id }, entity);
  }

  async create(entity) {
    return this._collection.create(entity);
  }
}
