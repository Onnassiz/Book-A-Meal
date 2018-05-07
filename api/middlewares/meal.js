import validate from 'validate.js';
import { cleanUpErrorMessages } from './auth';


export function validateMealFormData(req, res, next) {
	const constraints = {
		name: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		price: {
			presence: true,
			numericality: true,
		},
		imageUrl: {
			url: true,
		},
		userId: {
			presence: {
				allowEmpty: false,
				message: ' not verified',
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
	};
	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(cleanUpErrorMessages(errors));
	}
}

export function validateAddImageData(req, res, next) {
	const constraints = {
		imageUrl: {
			presence: {
				allowEmpty: false,
			},
			url: true,
		},
	};

	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(cleanUpErrorMessages(errors));
	}
}

