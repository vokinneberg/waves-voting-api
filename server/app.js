import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';
import { createLightship } from 'lightship';

import routes from './routes';
import logger from './core/logger';
import config from './core/config';
import ConnectionStringBuilder from './core/utils/db';

const app = express();
const router = express.Router();

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', router);
app.use(expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
}).unless({ path: ['/api/v1/projects','/api/v1/projects/:id'] }));
app.use((err, req, res, next)  => {
  logger.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
});

const lightship = createLightship();

mongoose.set('debug', process.env.NODE_ENV === 'development');

var mongoConnString = new ConnectionStringBuilder(config).buildConncetionString();
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
