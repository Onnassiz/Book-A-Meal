/* eslint no-param-reassign: 0 */
import { menu, meal, menuMeal, user, profile } from '../models';

class MenusController {
  constructor() {
    this.postMenu = this.postMenu.bind(this);
    this.putMenu = this.putMenu.bind(this);
    this.getMenusByUserId = this.getMenusByUserId.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.getMenuAndMeals = this.getMenuAndMeals.bind(this);
    this.getMenusByTimeStamp = this.getMenusByTimeStamp.bind(this);
    this.mapMenusToMeals = this.mapMenusToMeals.bind(this);
  }

  menuViewModelFromArray(meals) {
    const viewModel = [];
    meals.forEach((item) => {
      viewModel.push({
        id: item.id,
        name: item.name,
        mealsCount: item.meals.length,
        meals: `/api/v1/meals/menu/${item.id}`,
        unixTime: item.unixTime,
        caterer: item.user.profile === null ? null : item.user.profile.businessName,
        profileId: item.user.profile === null ? null : item.user.profile.id,
      });
    });
    return viewModel;
  }

  getMenusViewModel(menus, mealsCount = 0) {
    return menus.map((item) => {
      return {
        id: item.id,
        name: item.name,
        unixTime: item.unixTime,
        mealsCount: mealsCount || item.meals.length,
        meals: `/api/v1/meals/menu/${item.id}`,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }

  buildMenus(newMenu, times = 0) {
    const menus = [];
    for (let i = 0; i <= times; i += 1) {
      const extraDay = i * 86400;
      menus.push({
        name: newMenu.name,
        unixTime: newMenu.unixTime + extraDay,
        userId: newMenu.userId,
      });
    }
    return menus;
  }

  getMenusByUserId(req, res) {
    menu.findAll({
      include: [{
        model: meal,
      }],
      where: { userId: req.user.id },
      limit: req.params.limit || 10,
      offset: req.params.offset || 0,
      order: [['unixTime', 'DESC']],
    }).then((menus) => {
      res.status(200).send(this.getMenusViewModel(menus));
    });
  }

  getMenuById(id) {
    return menu.findOne({
      include: [{
        model: meal,
      }],
      where: { id },
    }).then((responseData) => {
      return responseData;
    });
  }

  getMenuAndMeals(req, res) {
    menu.findOne({
      include: [{
        model: meal,
      }],
      where: { id: req.params.id },
    }).then((responseData) => {
      res.status(200).send(this.getMenusViewModel([responseData])[0]);
    });
  }

  getMenus(req, res) {
    menu.findAll({
      include: [{
        model: meal,
      }],
      limit: req.params.limit || 10,
      offset: req.params.offset || 0,
      order: [['unixTime', 'DESC']],
    }).then((responseData) => {
      res.status(200).send(this.getMenusViewModel(responseData));
    });
  }

  getMenusByTimeStamp(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    menu.findAll({
      include: [
        {
          model: meal,
        },
        {
          model: user,
          include: [{ model: profile }],
        },
      ],
      where: { unixTime: timeStamp },
      limit: req.params.limit || 10,
      offset: req.params.offset || 0,
    }).then((responseData) => {
      res.status(200).send(this.menuViewModelFromArray(responseData));
    });
  }


  postMenu(req, res, next) {
    const { unixTime, name, extraDays } = req.body;
    const userId = req.user.id;

    const newMenus = this.buildMenus({ name, unixTime, userId }, extraDays);

    const unixTimes = newMenus.map((item) => {
      return item.unixTime;
    });

    menu.findOne({ where: { userId, unixTime: unixTimes } }).then((existingMenu) => {
      if (existingMenu) {
        return res.status(400).send({
          message: 'You have already created a menu for the selected date. You can still modify the already created menu',
        });
      }

      menu.bulkCreate(newMenus).then((createdMenus) => {
        req.menus = createdMenus;
        req.meals = req.body.meals;

        return next();
      }).catch((error) => {
        return res.status(400).send({ message: error.name });
      });
    }).catch((error) => {
      res.status(400).send({ message: error.name });
    });
  }

  mapMenusToMeals(req, res) {
    const { meals, menus } = req;

    const newMealMenus = [];
    menus.forEach((mn) => {
      meals.forEach((ml) => {
        newMealMenus.push({
          menuId: mn.id,
          mealId: ml.mealId,
          price: ml.price,
        });
      });
    });

    menuMeal.bulkCreate(newMealMenus).then(() => {
      res.status(201).send({
        message: 'Menu(s) successfully created',
        menus: this.getMenusViewModel(menus, meals.length),
      });
    }).catch((error) => {
      res.status(400).send({ message: error.name });
    });
  }

  putMenu(req, res) {
    const { unixTime } = req.body;
    const userId = req.user.id;
    menu.update(
      {
        id: req.params.id,
        name: req.body.name,
        unixTime,
        userId,
      },
      { where: { id: req.params.id }, returning: true },
    ).then((updated) => {
      const update = updated[1][0];
      if (update) {
        menuMeal.destroy({ where: { menuId: req.params.id } }).then(() => {
          const newMealMenus = [];
          const { meals } = req.body;

          meals.forEach((ml) => {
            newMealMenus.push({
              menuId: req.params.id,
              mealId: ml.mealId,
            });
          });

          menuMeal.bulkCreate(newMealMenus).then(() => {
            this.getMenuById(update.id).then((responseData) => {
              res.status(200).send({
                message: 'Menu successfully updated',
                menu: this.getMenusViewModel([responseData])[0],
              });
            });
          });
        });
      } else {
        res.status(404).send({ message: 'Menu not found' });
      }
    });
  }

  deleteMenu(req, res) {
    menu.destroy({
      where: { id: req.params.id },
    }).then(() => {
      res.status(200).send({
        message: 'Menu successfully deleted',
      });
    });
  }
}

export default new MenusController();
