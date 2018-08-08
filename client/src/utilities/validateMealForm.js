import validator from 'validator';
import empty from 'is-empty';

const validateRequiredFields = (data, price) => {
  const errors = {};
  if (validator.isEmpty(data.category || '')) {
    errors.category = 'The category field is required';
  }

  if (validator.isEmpty(price)) {
    errors.price = 'The price field is required';
  }

  if (validator.isEmpty(data.name || '')) {
    errors.name = 'The name field is required';
  }

  return errors;
};

const validateMeal = (data) => {
  const errors = {};
  const price = data.price ? data.price.toString() : '';

  if (!validator.isNumeric(price)) {
    errors.price = `${data.price} is not a valid number`;
  }

  const allErrors = Object.assign(errors, validateRequiredFields(data, price));

  return {
    errors: allErrors,
    isValid: empty(allErrors),
  };
};

export default validateMeal;

