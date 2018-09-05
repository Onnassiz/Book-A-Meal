import { getMealsMock } from './meals.props';

export const singleMenu = {
  id: '3a3c499f-803a-4e06-a328-307daff22243',
  name: 'Fantastic Day',
  date: '2018-09-11',
  meals: getMealsMock(8),
  mealsArray: getMealsMock(8),
  mealsCount: 8,
};

export const getMenusMock = (limit = 10) => {
  const menus = [];
  for (let index = 0; index < limit; index += 1) {
    menus.push(singleMenu);
  }
  return menus;
};
