import fileType from 'file-type';
import isSvg from 'is-svg';
import BaseRepository from './baseRepository';
import Base64Helper from '../core/utils/base64';
import ObjectNotFoundError from '../core/errors/objectNotFoundError';
import RequestValidationError from '../core/errors/requestValidationError';

export default class FilesRepository extends BaseRepository {
  constructor(model, schema, minio) {
    super(model, schema);
    this._minioClient = minio;
  }

  async get(name) {
    const file = await this._collection.findOne({ name }).exec();
    if (!file) throw new ObjectNotFoundError(`File: ${name} not found.`);

    const stream = await this._minioClient.getObject('trustamust', name);
    return { stream, mime_type: file.mime_type };
  }

  async create(data) {
    let mimeType;
    const ft = fileType(data);
    if (isSvg(data)) {
      mimeType = 'image/svg+xml';
    } else if (ft) {
      mimeType = ft.mime;
    }

    if (!mimeType) throw new RequestValidationError('File type is not suppoted.');

    const fileName = Base64Helper.generateUniqueString();
    // TODO: Move bucket name to the enviroment variables.
    await this._minioClient.putObject('trustamust', fileName, data);

    const file = {
      name: fileName,
      mime_type: mimeType,
    };
    return this._collection.create(file);
  }
}
