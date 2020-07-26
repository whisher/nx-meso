import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import {
  errorResponse,
  successResponseWithData,
} from '../helpers/api-response.helper';
import { UserDto } from '@iwdf/dto';
import UserModel from '../models/user.model';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const user = req['user'];
    const users = await UserModel.find({ _id: { $ne: user._id } }).select(
      '_id name email createdAt updatedAt following followers'
    );
    return successResponseWithData<UserDto[]>(res, users);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getUserById = async (req, res, next, id) => {
  const user = await UserModel.findOne({ _id: id });
  req.profile = user;
  console.log('req.profile', req.profile);
  const profileId = Types.ObjectId(req.profile._id);

  if (req.user && profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  next();
};
