import isUrl from 'is-url';


const { check } = require('express-validator/check');

export const mealFormConstraints = [
  check('name')
    .exists()
    .withMessage('the name field is require')
    .isLength({ min: 1 })
    .withMessage('the name field is required')
    .isString()
    .withMessage('the meal name must be a string')
    .trim(),

  check('category')
    .exists()
    .withMessage('the category field is require')
    .isLength({ min: 1 })
    .withMessage('the category field is required')
    .isString()
    .withMessage('the category field must be a string')
    .trim(),

  check('price')
    .exists()
    .withMessage('the price field is require')
    .isInt()
    .withMessage('the price field must must an integer')
    .trim(),

  check('imageUrl')
    .optional({ nullable: true })
    .custom(value => isUrl(value))
    .withMessage('image link must be a URL'),
];

export const mealUpdateFormConstraints = [
  check('name')
    .optional({ nullable: true })
    .isString()
    .withMessage('the meal name must be a string')
    .trim(),

  check('category')
    .optional({ nullable: true })
    .isString()
    .withMessage('the category field must be a string')
    .trim(),

  check('price')
    .optional({ nullable: true })
    .isInt()
    .withMessage('the price field must must an integer')
    .trim(),

  check('imageUrl')
    .optional({ nullable: true })
    .custom(value => isUrl(value))
    .withMessage('image link must be a URL'),
];
