import validate from 'uuid-validate';

const { check } = require('express-validator/check');

const orderFormConstraints = [
  check('contact')
    .exists()
    .withMessage('the phone number field is require')
    .isLength({ min: 1 })
    .withMessage('the phone number field is require')
    .isString()
    .withMessage('the phone number field must be a string')
    .trim(),

  check('address')
    .exists()
    .withMessage('the address field is require')
    .isLength({ min: 1 })
    .withMessage('the address field is required')
    .isString()
    .withMessage('the address field must be a string')
    .trim(),

  check('meals')
    .exists()
    .withMessage('the meals field is require')
    .isArray()
    .withMessage('the meals field must must an array')
    .isLength({ min: 1 })
    .withMessage('at least on meal is needed')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (!value[i].mealId || !value[i].menuId || !value[i].profileId) {
          noErrors = false;
          break;
        }
        if (!validate(value[i].mealId, 4) ||
          !validate(value[i].menuId, 4) || !validate(value[i].profileId, 4)) {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('at least one of the objects in the array does not have the \'mealId\', \'menuId\', or, \'profileId\' that is a contain a valid UUID4 value.')
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
    .withMessage('at least one of the meals supplied does not have a price. It is also possible you have supplied a price that is not a number.')
    .custom((value) => {
      let noErrors = true;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i].units === undefined || typeof value[i].units !== 'number') {
          noErrors = false;
          break;
        }
      }
      return noErrors;
    })
    .withMessage('you have not specified the units of a meal. It is also possible you have supplied a unit that is not a number.')
    .trim(),
];

export default orderFormConstraints;
