import { RequestHandler } from 'express';
import {
  errorResponse,
  successResponseWithData,
} from '../helpers/api-response.helper';
import { UserDto } from '@iwdf/dto';
import UserModel from '../models/user.model';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find().select(
      '_id username email createdAt following followers'
    );
    return successResponseWithData<UserDto>(req, users);
  } catch (err) {
    return errorResponse(res, err);
  }
};
