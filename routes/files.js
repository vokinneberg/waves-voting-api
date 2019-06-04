import { Client } from 'minio';
import Multer from 'multer';
import logger from '../core/logger';
import config from '../core/config';
import FileSchema from '../models/file';
import FilesController from '../controllers/filesController';
import FilesRepository from '../repository/filesRepository';

const minioClient = new Client({
  endPoint: config.minioHost,
  port: config.minioPort,
  useSSL: config.minioUseSsl,
  accessKey: config.minioAccessKey,
  secretKey: config.minioSecretKey,
});
const filesRepository = new FilesRepository('File', FileSchema, minioClient);
const filesContoller = new FilesController(logger, config, filesRepository);

export default router => {
  router.route('/files/:name').get(filesContoller.get.bind(filesContoller));

  router
    .route('/files')
    .post(
      Multer({ storage: Multer.memoryStorage() }).single('file-upload'),
      filesContoller.upload.bind(filesContoller)
    );
};
