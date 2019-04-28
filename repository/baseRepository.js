import mongoose from 'mongoose';

export default class BaseRepository {
    constructor(model, schema) {
        if (!schema && !model) {
            throw new Error('Mongoose model type cannot be null.');
        }
        this._collection = mongoose.model(model, schema);
    }
}
