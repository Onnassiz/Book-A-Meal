import isUrl from 'is-url';

const { check } = require('express-validator/check');

export const profileFormConstraints = [
  check('businessName')
    .exists()
    .withMessage('the business name field is require')
    .isLength({ min: 1 })
    .withMessage('the business name field is required')
    .isString()
    .withMessage('the business name must be a string')
    .trim(),

  check('mission')
    .exists()
    .withMessage('the mission name field is require')
    .isLength({ min: 1 })
    .withMessage('the mission name field is required')
    .isString()
    .withMessage('the mission name must be a string')
    .trim(),

  check('contact')
    .exists()
    .withMessage('the contact field is require')
    .isLength({ min: 1 })
    .withMessage('the contact field is required')
    .isString()
    .withMessage('the contact must must be a string')
    .trim(),

  check('email')
    .exists()
    .withMessage('the email field is require')
    .isLength({ min: 1 })
    .withMessage('the email field is required')
    .isEmail()
    .withMessage('the email field must be an email')
    .trim()
    .normalizeEmail(),

  check('banner')
    .optional({ nullable: true })
    .custom((value) => {
      return isUrl(value);
    })
    .withMessage('image link must be a URL'),
];

export const profileUpdateFormConstraints = [
  check('businessName')
    .optional({ nullable: true })
    .isString()
    .withMessage('the business name must be a string')
    .trim(),

  check('mission')
    .optional({ nullable: true })
    .isString()
    .withMessage('the business name must be a string')
    .trim(),

  check('contact')
    .optional({ nullable: true })
    .isString()
    .withMessage('the contact must must be a string')
    .trim(),

  check('email')
    .optional({ nullable: true })
    .isEmail()
    .withMessage('the email field must be an email')
    .trim()
    .normalizeEmail(),

  check('banner')
    .optional({ nullable: true })
    .custom((value) => {
      return isUrl(value);
    })
    .withMessage('image link must be a URL'),
];
