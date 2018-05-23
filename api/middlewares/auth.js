import jwt from 'jsonwebtoken';

const { check } = require('express-validator/check');

export const signInConstraints = [
	check('email')
		.exists()
		.withMessage('email is required')
		.isLength({ min: 1 })
		.withMessage('email is required')
		.isEmail()
		.withMessage('must be an email')
		.trim(),

	check('password')
		.exists()
		.isLength({ min: 1 })
		.withMessage('password is required'),
];

export const signUpConstraints = [
	check('email')
		.exists()
		.withMessage('email is required')
		.isLength({ min: 1 })
		.withMessage('email is required')
		.isEmail()
		.withMessage('email field must contain a valid email address')
		.trim(),

	check('fullName')
		.exists()
		.withMessage('the name field is require')
		.isLength({ min: 1 })
		.withMessage('the name field is required')
		.isString()
		.withMessage('the name must be a string')
		.trim(),

	check('password')
		.exists()
		.withMessage('password is required')
		.isLength({ min: 1 })
		.withMessage('password is required')
		.isLength({ min: 6 })
		.withMessage('password must contain at least 6 characters'),
];


export function verifyAuthToken(req, res, next) {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const token = bearerHeader.split(' ')[1];
		req.token = token;
		next();
	} else {
		res.status(401).send({
			message: 'Unauthorized',
		});
	}
}

export function validateToken(req, res, next) {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.status(401).send({
				message: 'Unauthorized',
			});
		} else {
			req.user = authData.data;
			next();
		}
	});
}

export function validateCatererToken(req, res, next) {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.status(401).send({
				message: 'Unauthorized',
			});
		} else {
			const { role } = authData.data;
			if (role === 'caterer') {
				req.user = authData.data;
				next();
			} else {
				res.status(401).send({
					message: 'Unauthorized',
				});
			}
		}
	});
}
