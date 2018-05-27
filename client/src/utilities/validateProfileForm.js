import validator from 'validator';
import empty from 'is-empty';

const validateProfile = (data) => {
	const errors = {};

	if (!validator.isEmail(data.email)) {
		errors.email = `${data.email} is not a valid email address`;
	}

	if (validator.isEmpty(data.businessName)) {
		errors.fullName = 'The business name field is required';
	}

	if (validator.isEmpty(data.mission)) {
		errors.mission = 'The mission name field is required';
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'The email field is required';
	}

	if (validator.isEmpty(data.contact)) {
		errors.contact = 'The contact field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};

export default validateProfile;

