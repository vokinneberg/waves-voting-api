import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';
import morgan from 'morgan';
import uuidv4 from 'uuid';
import { createLightship } from 'lightship';
import { CronJob } from 'cron';
import '@babel/polyfill';
import { Client } from 'minio';

import routes from './routes';
import adminRoutes from './routes/admin';
import logger from './core/logger';
import config from './core/config';
import ConnectionStringBuilder from './core/utils/db';
import errorHandler from './core/middleware/errorHandler';
import WavesHelper from './core/utils/waves';
import SnapshotJob from './cron-jobs/snapshotJob';
import { ProjectSchema } from './models/project';
import ProjectsRepository from './repository/projectsRepository';
import CleanUpJob from './cron-jobs/cleanUpJob';
import JWTHelper from './core/utils/jwt';
import FileSchema from './models/file';
import FilesRepository from './repository/filesRepository';

const app = express();
const router = express.Router();
const adminRouter = express.Router();

routes(router);
adminRoutes(adminRouter);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: config.uploadSizeLimit }));
app.use((err, req, res, next) => {
  req.id = uuidv4();
  next();
});
morgan.token('id', req => req.id);
app.use(
  morgan(
    ':id :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
    { stream: logger.stream }
  )
);
const exprJwt = expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      logger.info('Extracting token.');
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
}).unless({ path: ['/admin/api/v1/auth'] });
app.put('/api/v1/projects/:project_id/votes/*', exprJwt);
app.use('/api/v1', router);
app.all('/admin/api/v1/*', exprJwt);
app.use('/admin/api/v1', adminRouter);
app.use(errorHandler.handleError({ logger }));

mongoose.set('debug', process.env.NODE_ENV === 'development');

const mongoConnString = new ConnectionStringBuilder()
  .withHost(config.dbHost)
  .withDatabase(config.dbName)
  .build();

logger.info(`MongoDB Connection string: ${mongoConnString}`);

mongoose
  .connect(mongoConnString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.dbUser,
    pass: config.dbPassword
  })
  .then(() => {
    logger.info('Successfully connected to the database');
  })
  .catch(err => {
    logger.error('Could not connect to the database. Exiting now...', {
      message: err.message,
      stack: err.stack,
    });
  });

// Snapshot Job.
const minioClient = new Client({
  endPoint: config.minioHost,
  port: config.minioPort,
  useSSL: config.minioUseSsl,
  accessKey: config.minioAccessKey,
  secretKey: config.minioSecretKey,
});
const filesRepository = new FilesRepository('File', FileSchema, minioClient, config);
const jwtHelper = new JWTHelper(config.jwtSecret);
const wavesHelper = new WavesHelper(logger, config, jwtHelper);
const snapshotJob = new SnapshotJob(logger, config, wavesHelper, filesRepository);
new CronJob(config.snapshotCronPattern, () => {
  snapshotJob.run();
}).start();

// Clean up Job.
const projectsRepository = new ProjectsRepository('Project', ProjectSchema);
const cleanUpJob = new CleanUpJob(logger, config, projectsRepository);
new CronJob(config.cleanUpCronPattern, () => {
  cleanUpJob.run();
}).start();

const port = config.serverPort;
const server = app.listen(port, () => logger.info(`App listening on port ${port}!`));

const lightship = createLightship();
lightship.registerShutdownHandler(() => {
  server.close();
});

lightship.signalReady();

export default app;
