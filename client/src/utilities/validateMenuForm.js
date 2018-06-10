import validator from 'validator';
import empty from 'is-empty';

const validateMenu = (data) => {
	const errors = {};

	if (empty(data.selectedMeals)) {
		errors.selectedMeals = 'You must select at least one meal';
	}

	if (empty(data.date)) {
		errors.date = 'The date field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};

export default validateMenu;
