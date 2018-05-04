import validate from 'validate.js';

exports.validateAddress = (req, res, next) => {
	const constraints = {
		streetAddress: {
			presence: {
				allowEmpty: false,
			},
		},
		city: {
			presence: {
				allowEmpty: false,
			},
		},
		state: {
			presence: {
				allowEmpty: false,
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
		res.status(400).send(errors);
	}
};
