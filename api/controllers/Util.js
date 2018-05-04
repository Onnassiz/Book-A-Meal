const jwt = require('jsonwebtoken');

exports.signJsonWebToken = (user) => {
	const token = jwt.sign({
		// Set expiry to one day
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
		data: user,
	}, process.env.JWT_SECRET);
	return token;
};

exports.getErrorMessage = (error) => {
	const message = error.errors[0];
	return {
		[message.path]: message.message,
	};
};

