import mongoose from 'mongoose';
import { BadRequestError } from '../lib/errors';

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError('Invalid ObjectId in request params');
  }
  next();
};
