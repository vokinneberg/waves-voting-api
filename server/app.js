import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { createLightship } from 'lightship';

import routes from './routes';
import logger from './core/logger';
import config from './core/config';

const app = express();
const router = express.Router();

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', router);
// app.use(expressJwt({
//   secret: config.jwtSecret,
//   getToken: function fromHeader(req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     }
//     return null;
//   },
// }).unless({ path: ['/api/v1'] }));
app.use((err, req, res, next)  => {
  logger.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
});

const lightship = createLightship();

mongoose.set('debug', true);
mongoose.connect('mongodb://waves-voting:example@localhost:27017/waves-voting?authSource=admin', {
  useNewUrlParser: true
}).then(() => {
  logger.info("Successfully connected to the database");    
}).catch(err => {
  logger.info('Could not connect to the database. Exiting now...', err);
  process.exit();
});

const port = config.serverPort;
const server = app.listen(port, () => logger.info(`App listening on port ${port}!`));

lightship.registerShutdownHandler(() => {
  server.close();
});

// Lightship default state is "SERVER_IS_NOT_READY". Therefore, you must signal
// that the server is now ready to accept connections.
lightship.signalReady();

export default app;
