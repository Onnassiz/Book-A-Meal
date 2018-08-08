import validate from 'uuid-validate';

const { check } = require('express-validator/check');

const menuFormConstraints = [
  check('name')
    .optional({ nullable: true })
    .isString()
    .withMessage('the menu name must be a string')
    .trim(),

  check('date')
    .exists()
    .withMessage('the date field is required')
    .custom(value => new Date(value).toDateString() !== 'Invalid Date')
    .withMessage('the date supplied is not a valid date')
    .trim(),

  check('extraDays')
    .optional({ nullable: true })
    .isInt()
    .withMessage('the extra day field must be an integer')
    .custom(value => typeof value === 'number')
    .withMessage('the extra day field must be an integer')
    .trim(),

  check('meals')
    .exists()
    .withMessage('the meals field is required')
    .isArray()
    .withMessage('the meals field must an array')
    .isLength({ min: 1 })
    .withMessage('at least on meal is needed')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i].mealId === undefined) {
          noErrors = false;
          break;
        }
        if (!validate(value[i].mealId, 4)) {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('at least one of the objects in the array does not have the \'mealId\' or the id is not a valid UUID4 id')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i].price === undefined || typeof value[i].price !== 'number') {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('at least one of the meals in the supplied does not have a price. It is also possible you have supplied a price that is not a number.')
    .trim(),
];

const menuUpdateFormConstraints = [
  check('name')
    .optional({ nullable: true })
    .isString()
    .withMessage('the menu name must be a string')
    .trim(),

  check('date')
    .optional({ nullable: true })
    .custom(value => new Date(value).toDateString() !== 'Invalid Date')
    .withMessage('the date supplied is not a valid date')
    .trim(),

  check('meals')
    .optional({ nullable: true })
    .isArray()
    .withMessage('the meals field must an array')
    .isLength({ min: 1 })
    .withMessage('at least on meal is needed')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i].mealId === undefined) {
          noErrors = false;
          break;
        }
        if (!validate(value[i].mealId, 4)) {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('at least one of the objects in the array does not have the \'mealId\' or the id is not a valid UUID4 id')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i].price === undefined || typeof value[i].price !== 'number') {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('at least one of the meals in the supplied does not have a price. It is also possible you have supplied a price that is not a number.')
    .trim(),
];

export { menuFormConstraints, menuUpdateFormConstraints };

