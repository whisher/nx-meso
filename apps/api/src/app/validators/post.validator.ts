import { body } from 'express-validator';

export const add = [
  body('text')
    .isLength({ min: 10 })
    .trim()
    .withMessage('Your post must be at least 10 characters')
    .escape(),
];
