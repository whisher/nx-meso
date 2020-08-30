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
      '_id username email avatar createdAt updatedAt following followers'
    );
    return successResponseWithData<UserDto[]>(res, users);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getUserById = async (req, res, next, id) => {
  const user = await UserModel.findOne({ _id: id });
  req.profile = user;
  const profileId = Types.ObjectId(req.profile._id);

  if (req.user && profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  next();
};

export const addFollowing = async (req, res, next) => {
  const { _id: followId } = req.body;
  const user = req['user'];
  await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $push: { following: followId } }
  );
  next();
};

export const addFollower = async (req, res) => {
  const { _id: followId } = req.body;
  const _user = req['user'];
  const user = await UserModel.findOneAndUpdate(
    { _id: followId },
    { $push: { followers: _user._id } },
    { new: true }
  );
  res.json(user);
};

export const deleteFollowing = async (req, res, next) => {
  const { _id: followId } = req.body;
  const _user = req['user'];
  await UserModel.findOneAndUpdate(
    { _id: _user._id },
    { $pull: { following: followId } }
  );
  next();
};

export const deleteFollower = async (req, res) => {
  const { _id: followId } = req.body;
  const _user = req['user'];
  const user = await UserModel.findOneAndUpdate(
    { _id: followId },
    { $pull: { followers: _user._id } },
    { new: true }
  );
  res.json(user);
};
