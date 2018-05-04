import validate from 'validate.js';


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
			length: {
				minimum: 6,
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
