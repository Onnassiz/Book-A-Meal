import validate from 'uuid-validate';

const { check } = require('express-validator/check');

const orderFormConstraints = [
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
				if (value[i].mealId === undefined || value[i].units === undefined) {
					noErrors = false;
					break;
				}
				if (!validate(value[i].mealId, 4) || typeof value[i].units !== 'number') {
					noErrors = false;
					break;
				}
			}
			return noErrors;
		})
		.withMessage('at least one of the objects in the array does not have the \'mealId\' and it must contain a valid UUID4 id. It is also possible a unit has not been supplied or has been supplied in error')
		.trim(),
];

export default orderFormConstraints;
