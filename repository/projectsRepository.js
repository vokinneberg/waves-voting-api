import BaseRepository from './baseRepository';

export default class ProjectsRepository extends BaseRepository {
  async findOne(id) {
    return this._collection.findOne({ project_id: id });
  }

  async find() {
    return this._collection.find({});
  }

  async update(id, entity) {
    return this._collection.findOneAndUpdate({ project_id: id }, entity);
  }

  async create(entity) {
    return this._collection.create(entity);
  }
}
