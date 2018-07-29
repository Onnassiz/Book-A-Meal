import { menu, meal } from '../../api/models';
import { insertMock } from '../meals/index';
import { getCatererId } from '../main';

const deleteMenus = (done) => {
  menu.destroy({
    where: {},
  }).then(() => {
    meal.destroy({
      where: {},
    }).then(() => {
      done();
    });
  });
};

const getMealIds = () => {
  return insertMock().then((data) => {
    const meals = data.map((item) => {
      return {
        mealId: item.id,
        price: 1000,
      };
    });

    return meals.splice(20, 20);
  });
};

const insertOneMenu = (done) => {
  return getCatererId(done, false).then((id) => {
    const newMenu = menu.build({
      userId: id,
      name: 'Fire bons',
      date: '2018-08-08',
    });

    return newMenu.save().then((data) => {
      return data;
    });
  });
};

export {
  deleteMenus,
  getMealIds,
  insertOneMenu,
};
