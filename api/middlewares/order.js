import validate from 'validate.js';

exports.validateOrder = (req, res, next) => {
	const constraints = {
		meals: {
			presence: true,
			length: { minimum: 1, message: ' are empty. At least one meal is needed' },
		},
		amount: {
			presence: true,
			numericality: { noStrings: true },
		},
		userId: {
			presence: { allowEmpty: false, message: ' verification failed' },
		},
	};

	const errors = validate(req.body, constraints);
	if (errors == null) {
		next();
	} else {
		res.status(400).send(errors);
	}
};
