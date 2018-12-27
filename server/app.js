import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { createLightship } from 'lightship';
import routes from './routes';
import logger from './core/logger/logger';
import config from './core/config/config';

const app = express();
const router = express.Router();

routes(router);

app.use(cors());
app.use('/api', router);
app.use(expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
}).unless({ path: ['/api/auth'] }));
app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
});

const lightship = createLightship();

mongoose.connect('mongodb://waves-voting:example@mongo-db:27017/waves-voting?authSource=admin');

const port = config.serverPort;
const server = app.listen(port, () => logger.info(`App listening on port ${port}!`));

lightship.registerShutdownHandler(() => {
  server.close();
});

// Lightship default state is "SERVER_IS_NOT_READY". Therefore, you must signal
// that the server is now ready to accept connections.
lightship.signalReady();

export default app;
