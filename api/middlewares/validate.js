import validate from 'uuid-validate';

const { buildCheckFunction, validationResult } = require('express-validator/check');

const checkBodyAndQuery = buildCheckFunction(['body', 'params']);

function cleanUpErrorMessages(errors) {
	const newErrors = {};
	for (const key in errors) {
		newErrors[key] = errors[key].msg;
	}
	return newErrors;
}

export const validParamId = [
	checkBodyAndQuery('id')
		.optional({ nullable: true })
		.custom((value) => {
			return validate(value, 4);
		})
		.withMessage('wrong id format in params. id must be a valid UUID4'),
	checkBodyAndQuery('userId')
		.optional({ nullable: true })
		.custom((value) => {
			return validate(value, 4);
		})
		.withMessage('wrong id format in params. id must be a valid UUID4'),
];

export function validateFormData(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req.headers);
		return res.status(400).send(cleanUpErrorMessages(errors.mapped()));
	}
	return next();
}

