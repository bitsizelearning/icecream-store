import config from 'config';
import mongoose from 'mongoose';
import logger from './lib/logger';

const connectionString = config.get('mongodb');

export const initializeDB = () => {
  mongoose.connect(connectionString, () => {
    logger.info('Connected to MongoDB!!');
  });
};
