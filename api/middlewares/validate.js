/* eslint guard-for-in: 0, no-restricted-syntax: 0 */
import validate from 'uuid-validate';

const { buildCheckFunction, validationResult } = require('express-validator/check');

const checkBodyAndQuery = buildCheckFunction(['body', 'params', 'query']);

function cleanUpErrorMessages(errors) {
  const newErrors = {};
  for (const key in errors) {
    newErrors[key] = errors[key].msg;
  }
  return newErrors;
}

export const validParamId = [
  checkBodyAndQuery('id')
    .optional({ nullable: true })
    .custom(value => validate(value, 4))
    .withMessage('wrong id format in params. id must be a valid UUID4'),
];

export const validateQueryString = [
  checkBodyAndQuery('limit')
    .optional({ nullable: true })
    .isInt()
    .withMessage('the limit field must be an integer'),
  checkBodyAndQuery('offset')
    .optional({ nullable: true })
    .isInt()
    .withMessage('the offset field must be an integer'),
  checkBodyAndQuery('date')
    .optional({ nullable: true })
    .custom(value => new Date(value).toDateString() !== 'Invalid Date')
    .withMessage('the date field must be a valid date'),
];

/**
 * @param {req} req express request method that holds all request credentials
 * @param {res} res express response method that sends a request's response
 * @param {next} next this method takes the user to the next middleware method.
 */
export function validateFormData(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(cleanUpErrorMessages(errors.mapped()));
  }
  return next();
}

