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
    .withMessage('the business name field is require')
    .isLength({ min: 1 })
    .withMessage('the business name field is required')
    .isString()
    .withMessage('the business name must be a string')
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

export const profileBannerConstraints = [
  check('banner')
    .exists()
    .withMessage('the image field is require')
    .isLength({ min: 1 })
    .withMessage('the image field is required')
    .optional({ nullable: true })
    .custom((value) => {
      return isUrl(value);
    })
    .withMessage('image link must be a URL'),
];
