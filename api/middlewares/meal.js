import validate from 'validate.js';


exports.validateMealFormData = (req, res, next) => {
	const constraints = {
		name: {
			presence: {
				allowEmpty: false,
			},
		},
		price: {
			presence: true,
			numericality: { noStrings: true },
		},
		imageUrl: {
			url: true,
		},
		userId: {
			presence: {
				allowEmpty: false,
				message: ' not verified',
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

exports.validateAddImageData = (req, res, next) => {
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
		res.status(400).send(errors);
	}
};
