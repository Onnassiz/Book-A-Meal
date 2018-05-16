import validate from 'uuid-validate';

const { check } = require('express-validator/check');

const menuFormConstraints = [
	check('name')
		.optional({ nullable: true })
		.isString()
		.withMessage('the menu name must must be a string')
		.trim(),

	check('unixTime')
		.exists()
		.withMessage('the unixTime field is require')
		.isInt()
		.withMessage('the unixTime field must must an integer')
		.custom((value) => {
			return typeof value === 'number';
		})
		.withMessage('the unixTime field must must be an integer')
		.trim(),

	check('meals')
		.exists()
		.withMessage('the meals field is require')
		.isArray()
		.withMessage('the meals field must must an array')
		.isLength({ min: 1 })
		.withMessage('at least on meal is needed')
		.custom((value) => {
			let noErrors = true;
			for (let i = 0; i < value.length; i += 1) {
				if (value[i].mealId === undefined) {
					noErrors = false;
					break;
				}
				if (!validate(value[i].mealId, 4)) {
					noErrors = false;
					break;
				}
			}
			return noErrors;
		})
		.withMessage('at least one of the objects in the array does not have the \'mealId\' or the id is not a valid UUID4 id')
		.trim(),
];

export default menuFormConstraints;

