import validate from 'validate.js';
import { cleanUpErrorMessages } from './auth';

export default function validateAddress(req, res, next) {
	const constraints = {
		streetAddress: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		city: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		state: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		userId: {
			presence: {
				allowEmpty: false,
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

