import { getMealsMock, singleMeal } from '../objectProps/meals.props';

export const getMeals = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: {
      meals: getMealsMock(11),
      count: 11,
    },
  });
});

export const updateMeal = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: {
      meal: singleMeal,
    },
  });
});

export const postMeal = () => new Promise((resolve) => {
  resolve({
    status: 201,
    data: {
      meal: singleMeal,
    },
  });
});

export const deleteMealById = () => new Promise((resolve) => {
  resolve({
    status: 200,
  });
});

