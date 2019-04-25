import { Client } from 'minio'
import Multer from 'multer'
import logger from '../core/logger'
import config from '../core/config'
import FilesController from '../controllers/filesController'

const minioClient = new Client({
    endPoint: config.minioHost,
    port: config.minioPort,
    useSSL: false,
    accessKey: config.minioAccessKey,
    secretKey: config.minioSecretKey,
})
const filesContoller = new FilesController(minioClient, logger, config)

export default router => {
    router.route('/files/:name').get(filesContoller.get.bind(filesContoller))

    router
        .route('/files')
        .post(
            Multer({ storage: Multer.memoryStorage() }).single('file-upload'),
            filesContoller.upload.bind(filesContoller)
        )
}
