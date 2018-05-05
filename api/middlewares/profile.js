import validate from 'validate.js';
import { cleanUpErrorMessages } from './auth';


export default function validateProfile(req, res, next) {
	const constraints = {
		businessName: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		contact: {
			presence: {
				allowEmpty: false,
			},
		},
		userId: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 1,
				message: 'must be a string',
			},
		},
		email: {
			email: true,
		},
	};
	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(cleanUpErrorMessages(errors));
	}
}

