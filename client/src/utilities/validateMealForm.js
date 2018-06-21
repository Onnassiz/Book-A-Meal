import validator from 'validator';
import empty from 'is-empty';

const validateMeal = (data) => {
  const errors = {};

  if (!validator.isNumeric(data.price)) {
    errors.price = `${data.price} is not a valid number`;
  }

  if (validator.isEmpty(data.category)) {
    errors.category = 'The category field is required';
  }

  if (validator.isEmpty(data.price)) {
    errors.price = 'The price field is required';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'The name field is required';
  }

  return {
    errors,
    isValid: empty(errors),
  };
};

export default validateMeal;

