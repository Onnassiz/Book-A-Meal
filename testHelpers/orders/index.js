import { order, meal } from '../../api/models';
import { insertMealMock } from '../meals/index';
import { getCustomerId } from '../main';

const deleteOrders = (done, callDone = true) => order.destroy({
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
    units: 1,
  }));

  return meals.splice(30, 10);
});

const insertOneOrder = () => getCustomerId().then((id) => {
  const newMenu = order.build({
    userId: id,
    contact: 'Fire bons',
    address: 'This is the real address',
  });

  return newMenu.save().then(data => data);
});

const insertOutdatedOrder = () => getCustomerId().then((id) => {
  const newMenu = order.build({
    userId: id,
    contact: 'Fire bons',
    address: 'This is the real address',
    createdAt: '2018-08-21',
  });

  return newMenu.save().then(data => data);
});

export {
  deleteOrders,
  getMealIds,
  insertOneOrder,
  insertOutdatedOrder,
};
