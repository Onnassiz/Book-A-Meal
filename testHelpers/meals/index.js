
import { meal } from '../../api/models';
import { getCatererId } from '../main';
import getMealsMock from './mock';

const deleteMeals = (done, callDone = true) => meal.destroy({
  where: {},
}).then((deleted) => {
  if (callDone) {
    done();
  }
  return deleted;
});

const insertMealMock = done => getCatererId(done, false).then((id) => {
  const mocks = getMealsMock(id);

  return meal.bulkCreate(mocks).then(data => data);
});

const getMealId = () => meal.findOne({ where: { price: 80 } }).then(data => data.id);

const insertOneMeal = done => getCatererId(done, false).then((id) => {
  const newMeal = meal.build({
    name: 'The Good Meal',
    price: 2000,
    userId: id,
    description: null,
    category: 'Hot meal',
    imageUrl: 'http://bens.com',
  });

  return newMeal.save().then(data => data);
});

export {
  deleteMeals,
  insertOneMeal,
  getMealId,
  insertMealMock,
};

