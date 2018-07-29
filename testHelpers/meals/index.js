
import { meal } from '../../api/models';
import { getCatererId } from '../main';
import getMealsMock from './mock';

const deleteMeals = (done) => {
  meal.destroy({
    where: {},
  }).then(() => {
    done();
  });
};

const insertMock = (done) => {
  return getCatererId(done, false).then((id) => {
    const mocks = getMealsMock(id);

    return meal.bulkCreate(mocks).then((data) => {
      return data;
    });
  });
};

const getMealId = () => {
  return meal.findOne({ where: { price: 857 } }).then((data) => {
    return data.id;
  });
};

const insertOneMeal = (done) => {
  return getCatererId(done, false).then((id) => {
    const newMeal = meal.build({
      name: 'The Good Meal',
      price: 2000,
      userId: id,
      description: null,
      category: 'Hot meal',
      imageUrl: 'http://bens.com',
    });

    return newMeal.save().then((data) => {
      return data;
    });
  });
};

export {
  deleteMeals,
  insertOneMeal,
  getMealId,
  insertMock,
};

