import validate from 'validate.js';

const jwt = require('jsonwebtoken');


exports.validateSignInFormData = (req, res, next) => {
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
		res.status(400).send(errors);
	}
};

exports.validateSignUpFormData = (req, res, next) => {
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
			length: {
				minimum: 6,
			},
		},
		fullName: {
			presence: {
				allowEmpty: false,
			},
		},
	};
	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(errors);
	}
};

exports.verifyAuthToken = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const token = bearerHeader.split(' ')[1];
		req.token = token;
		next();
	} else {
		res.status(403).send('Forbidden');
	}
};

exports.validateToken = (req, res, next) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.status(403).send('Forbidden');
		} else {
			req.user = authData.data;
			next();
		}
	});
};

exports.validateCatererToken = (req, res, next) => {
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
};

