import validate from 'uuid-validate';

const { check } = require('express-validator/check');

const orderFormConstraints = [
	check('meals')
		.exists()
		.withMessage('the meals field is require')
		.isArray()
		.withMessage('the unixTime field must must an array')
		.isLength({ min: 1 })
		.withMessage('at least on meal is needed')
		.custom((value) => {
			let error = false;
			value.forEach((item) => {
				if (item.mealId === (undefined) || item.units === (undefined)) {
					error = true;
				} else {
					error = !validate(item.mealId, 4);
					error = typeof item.units !== 'number';
				}
			});
			return !error;
		})
		.withMessage('at least one of the objects in the array does not have the \'mealId\' and it must contain a valid UUID4 id. It is also possible a unit has not been supplied or has been supplied in error')
		.trim(),
];

export default orderFormConstraints;
