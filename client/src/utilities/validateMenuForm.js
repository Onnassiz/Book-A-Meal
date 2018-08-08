import empty from 'is-empty';

const validateMenu = (data) => {
  const errors = {};

  if (empty(data.meals)) {
    errors.selectedMeals = 'You must select at least one meal';
  }

  if (empty(data.date)) {
    errors.startDate = 'The date field is required';
  }

  return {
    errors,
    isValid: empty(errors),
  };
};

export default validateMenu;

