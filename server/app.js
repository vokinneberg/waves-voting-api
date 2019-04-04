import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';
import { createLightship } from 'lightship';

import routes from './routes';
import adminRoutes from './routes/admin';
import logger from './core/logger';
import config from './core/config';
import ConnectionStringBuilder from './core/utils/db';

const app = express();
const router = express.Router();
const adminRouter = express.Router();

routes(router);
adminRoutes(adminRouter);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', router);
app.all('/admin/api/v1/*', expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      logger.info('Extracting token.');
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
}).unless({ path : ['/admin/api/v1/auth'] }));
app.use('/admin/api/v1', adminRouter);
app.use((err, req, res, next)  => {
  logger.error(`${err.message}. Stack trace: ${err.stack}.`);
  if (err.status) {
    res.status(err.status).send({code: err.code, message: err.message});
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({code: 'internal_error', message: 'Something went wrong!'});
});

const lightship = createLightship();

mongoose.set('debug', process.env.NODE_ENV === 'development');

var mongoConnString = new ConnectionStringBuilder(config).buildConneсtionString();
mongoose.connect(mongoConnString, {
  useNewUrlParser: true
}).then(() => {
  logger.info("Successfully connected to the database");    
}).catch(err => {
  logger.error('Could not connect to the database. Exiting now...', { 
    'message': err.message,
    'stack': err.stack
  });
});

const port = config.serverPort;
const server = app.listen(port, () => logger.info(`App listening on port ${port}!`));

lightship.registerShutdownHandler(() => {
  server.close();
});

lightship.signalReady();

export default app;
