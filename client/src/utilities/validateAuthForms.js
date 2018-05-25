import validator from 'validator';
import empty from 'is-empty';

export const validateSignUp = (data) => {
	const errors = {};

	if (!validator.isEmail(data.signUpEmail)) {
		errors.signUpEmail = `${data.signUpEmail} is not a valid email address`;
	}

	if (data.password.length < 8) {
		errors.password = 'Password must contain at least 8 characters';
	}

	if (data.password !== data.confirm_password) {
		errors.confirm_password = 'Password confirmation must match password';
	}

	if (validator.isEmpty(data.fullName)) {
		errors.fullName = 'The full name field is required';
	}

	if (validator.isEmpty(data.signUpEmail)) {
		errors.signUpEmail = 'The email field is required';
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'The password field is required';
	}

	if (validator.isEmpty(data.confirm_password)) {
		errors.confirm_password = 'The password confirmation field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};

export const validateSignIn = (data) => {
	const errors = {};

	if (!validator.isEmail(data.signInEmail)) {
		errors.signInEmail = `${data.signInEmail} is not a valid email address`;
	}

	if (validator.isEmpty(data.signInEmail)) {
		errors.signInEmail = 'The email field is required';
	}

	if (validator.isEmpty(data.signInPassword)) {
		errors.signInPassword = 'The password field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};
