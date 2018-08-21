import { menu, meal } from '../../api/models';
import { insertMealMock } from '../meals/index';
import { getCatererId } from '../main';

const deleteMenus = (done, callDone = true) => menu.destroy({
  where: {},
}).then(() => meal.destroy({
  where: {},
}).then((deleted) => {
  if (callDone) {
    done();
  }
  return deleted;
}));

const getMealIds = () => insertMealMock().then((data) => {
  const meals = data.map(item => ({
    mealId: item.id,
    price: 1000,
  }));

  return meals.splice(20, 20);
});

const insertOneMenu = () => getCatererId().then((id) => {
  const newMenu = menu.build({
    userId: id,
    name: 'Fire bons',
    date: '2018-08-08',
  });

  return newMenu.save().then(data => data);
});

export {
  deleteMenus,
  getMealIds,
  insertOneMenu,
};
