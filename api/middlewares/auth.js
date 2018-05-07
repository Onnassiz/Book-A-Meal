
import validate from 'validate.js';
import jwt from 'jsonwebtoken';

export function cleanUpErrorMessages(errors) {
	const newErrors = {};
	for (const key in errors) {
		newErrors[key] = errors[key][0];
	}
	return newErrors;
}

export function validateSignInFormData(req, res, next) {
	const constraints = {
		email: {
			presence: {
				allowEmpty: false,
			},
			email: true,
		},
		password: {
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

export function validateSignUpFormData(req, res, next) {
	const constraints = {
		email: {
			presence: {
				allowEmpty: false,
			},
			email: true,
		},
		password: {
			length: {
				minimum: 6,
			},
			presence: {
				allowEmpty: false,
			},
		},
		fullName: {
			presence: {
				allowEmpty: false,
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

export function verifyAuthToken(req, res, next) {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const token = bearerHeader.split(' ')[1];
		req.token = token;
		next();
	} else {
		res.status(403).send('Forbidden');
	}
}

export function validateToken(req, res, next) {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.status(403).send('Forbidden');
		} else {
			req.user = authData.data;
			next();
		}
	});
}

export function validateCatererToken(req, res, next) {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.status(403).send('Forbidden');
		} else {
			const { role } = authData.data;
			if (role === 'caterer') {
				req.user = authData.data;
				next();
			} else {
				res.status(403).send('Forbidden');
			}
		}
	});
}

