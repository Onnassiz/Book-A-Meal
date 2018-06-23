import { user, meal, menu, order, profile } from '../api/models';

const uuidv4 = require('uuid/v4');

class TestUtil {
  constructor() {
    this.meal_1_Id = uuidv4();
    this.meal_2_Id = uuidv4();
  }

  deleteUser(email, done) {
    user.destroy({
      where: { email },
    }).then(() => {
      done();
    });
  }

  insertMeals(done, callDone) {
    user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
      meal.bulkCreate([
        {
          id: uuidv4(),
          name: 'Fire bons',
          price: 2000,
          category: 'Hot meal',
          userId: usr.id,
          imageUrl: 'http://bens.com',
        },
        {
          id: uuidv4(),
          name: 'Chicken Salad',
          price: 4000,
          category: 'Hot meal',
          userId: usr.id,
          imageUrl: 'http://bens.com',
        },
      ]).then(() => {
        if (callDone) {
          done();
        }
      });
    });
  }

  insertMenus(done, callDone) {
    this.insertMeals(done, false);
    user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
      menu.bulkCreate([
        {
          name: 'Monday Special',
          unixTime: 1525564800,
          userId: usr.id,
          meals: [
            {
              mealId: this.meal_1_Id,
              price: 200,
            },
            {
              mealId: this.meal_2_Id,
              price: 200,
            },
          ],
        },
        {
          name: 'Tuesday Special',
          unixTime: 1525651200,
          userId: usr.id,
          meals: [
            {
              mealId: this.meal_1_Id,
              price: 300,
            },
            {
              mealId: this.meal_2_Id,
              price: 400,
            },
          ],
        },
      ]).then(() => {
        if (callDone) {
          done();
        }
      });
    });
  }

  insertOrders(done) {
    this.insertMeals(done, false);
    this.insertProfile(done, false);
    this.insertMenus(done, false);
    user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
      order.bulkCreate([
        {
          address: '1525, Allen Road',
          contact: '+234888342193',
          userId: usr.id,
          meals: [
            {
              mealId: this.meal_1_Id,
              price: 200,
              units: 2,
            },
            {
              mealId: this.meal_2_Id,
              price: 300,
              units: 3,
            },
          ],
        },
        {
          address: '1525, Allen Road',
          contact: '+234888342193',
          userId: usr.id,
          meals: [
            {
              mealId: this.meal_1_Id,
              price: 200,
              units: 2,
            },
            {
              mealId: this.meal_2_Id,
              price: 200,
              units: 2,
            },
          ],
        },
        {
          address: '1525, Allen Road',
          contact: '+234888342193',
          userId: usr.id,
          createdAt: '2018-05-09 16:23:11.689+01',
          meals: [
            {
              mealId: this.meal_1_Id,
              price: 200,
              units: 2,
            },
            {
              mealId: this.meal_2_Id,
              price: 200,
              units: 2,
            },
          ],
        },
      ]).then(() => {
        done();
      });
    });
  }

  insertProfile(done, callDone) {
    user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
      profile.bulkCreate([
        {
          businessName: 'Just eat',
          contact: '080321231232',
          email: 'justEat@gmail.com',
          mission: 'Feeding the richest',
          banner: 'http://banner.com',
          userId: usr.id,
        },
      ]).then(() => {
        if (callDone) {
          done();
        }
      });
    });
  }

  deleteMeals(done, callDone) {
    meal.destroy({
      where: {},
    }).then(() => {
      if (callDone) {
        done();
      }
    });
  }

  deleteProfiles(done, callDone) {
    return profile.destroy({
      where: {},
    }).then(() => {
      if (callDone) {
        done();
      }
    });
  }

  deleteMenus(done, callDone) {
    this.deleteMeals(done, false);
    menu.destroy({
      where: {},
    }).then(() => {
      if (callDone) {
        done();
      }
    });
  }

  deleteOrders(done) {
    this.deleteProfiles(done, false);
    this.deleteMenus(done, false);
    this.deleteMeals(done, false);
    order.destroy({
      where: {},
    }).then(() => {
      done();
    });
  }

  getMealId() {
    return meal.findOne().then((ml) => {
      return ml.id;
    });
  }

  getProfileId() {
    return profile.findOne().then((ml) => {
      return ml.id;
    });
  }

  getMenuId() {
    return menu.findOne().then((mn) => {
      return mn.id;
    });
  }

  getOrderId() {
    return order.findOne().then((ord) => {
      return ord.id;
    });
  }

  getLastOrderId() {
    return order.findOne({ where: { createdAt: '2018-05-09 16:23:11.689+01' } }).then((ord) => {
      return ord.id;
    });
  }

  getUserId() {
    return user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
      return usr.id;
    });
  }

  getCustomerId() {
    return user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
      return usr.id;
    });
  }

  getCustomerIdMenuIdProfileIdMealIds() {
    return this.getCustomerId().then((id) => {
      return this.getProfileId().then((profileId) => {
        return this.getMenuId().then((menuId) => {
          return meal.findAll().then((mls) => {
            return {
              id,
              meal_1_Id: mls[0].id,
              meal_2_Id: mls[1].id,
              menuId,
              profileId,
            };
          });
        });
      });
    });
  }
}

export default new TestUtil();
