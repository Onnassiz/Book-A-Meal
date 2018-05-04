import validate from 'validate.js';

exports.validateProfile = (req, res, next) => {
	const constraints = {
		businessName: {
			presence: {
				allowEmpty: false,
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
		},
		email: {
			email: true,
		},
	};
	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(errors);
	}
};
