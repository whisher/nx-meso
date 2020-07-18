import UserModel from '../models/user.model';
import { body } from 'express-validator';

export const signup = [
  body('username')
    .isLength({ min: 3 })
    .trim()
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('Username has non-alphanumeric characters.')
    .escape(),
  body('email')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom((value) => {
      return UserModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    })
    .escape(),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.')
    .escape(),
];

export const login = [
  body('email')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .escape(),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be specified.')
    .escape(),
];
