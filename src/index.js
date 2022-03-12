import config from 'config';
import express from 'express';
import morgan from 'morgan';
import { initializeDB } from './db';
import errorHandler from './lib/error.handler';
import logger from './lib/logger';
import routes from './routes';

const app = express();
const port = config.get('port');
const httpReqLogFormat =
  ':method :url :status :res[content-length] - :response-time ms';
const httpReqLogger = morgan(httpReqLogFormat, { stream: logger.stream });

// connect to database
initializeDB();

// middlewares
app.use(express.json());
app.use(httpReqLogger);

// routes
app.use('/', routes);

// error handling
app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found!' });
});

app.listen(port, () => {
  console.log('listening to port', port);
});
