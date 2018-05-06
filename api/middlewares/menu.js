import validate from 'validate.js';
import { cleanUpErrorMessages } from './auth';


export default function validateMenuFormData(req, res, next) {
	const constraints = {
		unixTime: {
			presence: true,
			numericality: true,
		},
		meals: {
			// presence: true,
			length: { minimum: 1, message: ' are empty. At least one meal is needed' },
		},
		userId: {
			presence: { allowEmpty: false, message: 'verification failed' },
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

