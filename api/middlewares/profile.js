import isUrl from 'is-url';

const { check } = require('express-validator/check');

const profileFormConstraints = [
	check('businessName')
		.exists()
		.withMessage('the business name field is require')
		.isString()
		.withMessage('the business name must be a string')
		.trim(),

	check('mission')
		.exists()
		.withMessage('the business name field is require')
		.isString()
		.withMessage('the business name must be a string')
		.trim(),

	check('contact')
		.exists()
		.withMessage('the contact field is require')
		.isString()
		.withMessage('the contact must must be a string')
		.trim(),

	check('email')
		.optional({ nullable: true })
		.isEmail()
		.withMessage('must be an email')
		.trim()
		.normalizeEmail(),

	check('banner')
		.optional({ nullable: true })
		.custom((value) => {
			return isUrl(value);
		})
		.withMessage('image link must be a URL'),
];

export default profileFormConstraints;
