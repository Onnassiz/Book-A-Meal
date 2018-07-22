import empty from 'is-empty';
import isMobilePhone from 'validator/lib/isMobilePhone';

const validateOrder = (data) => {
  const errors = {};

  if (!isMobilePhone(data.telephone, 'any')) {
    errors.telephone = `${data.telephone} is not a valid phone number`;
  }

  if (empty(data.address)) {
    errors.address = 'The address field is required';
  }

  if (empty(data.telephone)) {
    errors.telephone = 'The phone number field is required';
  }

  return {
    errors,
    isValid: empty(errors),
  };
};

export default validateOrder;
