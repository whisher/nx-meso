import { RequestHandler } from 'express';
import { compare, hash } from 'bcrypt';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';

import { environment } from '../../environments/environment';
import { AuthTokenDto, UserDto } from '@iwdf/dto';

import UserModel from '../models/user.model';
import {
  errorResponse,
  successResponseWithData,
  unauthorizedResponse,
  validationErrorWithData,
} from '../helpers/api-response.helper';

export const signup: RequestHandler = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorWithData(res, errors.array());
    }
    hash(req.body.password, 10, (err, hash) => {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      // Save user.
      user.save((err) => {
        if (err) {
          return errorResponse(res, err);
        }
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        return successResponseWithData(res, userData);
      });
    });
  } catch (err) {
    //throw error in json response with status 500.
    return errorResponse(res, err);
  }
};

export const login: RequestHandler = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorWithData(res, errors.array());
    }
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        //Compare given password with db's hash.
        compare(req.body.password, user.password, (err, same) => {
          if (same) {
            // Check User's account active or not.
            if (user.status) {
              let userData = {
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                email: user.email,
              };
              //Prepare JWT token for authentication
              const jwtPayload = userData;
              const jwtData = {
                expiresIn: environment.jwtTimeout,
              };
              const secret = environment.jwtSecret;
              //Generated JWT token with Payload and secret.
              const token = sign(jwtPayload, secret, jwtData);
              return successResponseWithData<AuthTokenDto>(res, token);
            } else {
              return unauthorizedResponse(
                res,
                'Account is not active. Please contact admin.'
              );
            }
          } else {
            return unauthorizedResponse(res, 'Email or Password wrong.');
          }
        });
      } else {
        return unauthorizedResponse(res, 'Email or Password wrong.');
      }
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const account: RequestHandler = (req, res) => {
  successResponseWithData<UserDto>(res, req.user);
};
