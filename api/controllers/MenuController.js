/* eslint no-param-reassign: 0 */
import moment from 'moment';
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
        date: item.date,
        caterer: item.user.profile === null ? null : item.user.profile.businessName,
        profileId: item.user.profile === null ? null : item.user.profile.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });
    return viewModel;
  }

  getMenusViewModel(menus, mealsCount = 0) {
    return menus.map((item) => {
      return {
        id: item.id,
        name: item.name,
        date: item.date,
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
      menus.push({
        name: newMenu.name,
        date: moment(newMenu.date).add(i, 'days'),
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
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['date', 'DESC']],
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
    const { date } = req.query;
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
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['date', 'DESC']],
      where: date ? { date } : null,
    }).then((responseData) => {
      res.status(200).send(this.menuViewModelFromArray(responseData));
    });
  }

  getMenusByTimeStamp(req, res) {
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
      where: { date: req.query.date },
      limit: req.params.limit || 10,
      offset: req.params.offset || 0,
    }).then((responseData) => {
      res.status(200).send(this.menuViewModelFromArray(responseData));
    });
  }


  postMenu(req, res, next) {
    const { date, name, extraDays } = req.body;
    const userId = req.user.id;

    const newMenus = this.buildMenus({ name, date, userId }, extraDays);

    const dates = newMenus.map((item) => {
      return item.date;
    });

    menu.findOne({ where: { userId, date: dates } }).then((existingMenu) => {
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
    const { date } = req.body;
    const userId = req.user.id;

    menu.findOne({ where: { id: req.params.id } }).then((existingMenu) => {
      if (existingMenu) {
        if (existingMenu.date !== date) {
          menu.findOne({ where: { userId, date } }).then((otherMenus) => {
            if (otherMenus) {
              return res.status(400).send({
                message: 'You have already created a menu for the selected date. Please choose a different date.',
              });
            }
          });
        }

        menu.update(
          {
            id: req.params.id,
            name: req.body.name,
            date,
            userId,
          },
          { where: { id: req.params.id }, returning: true },
        ).then((updated) => {
          const update = updated[1][0];
          if (update) {
            const { meals } = req.body;

            if (meals) {
              menuMeal.destroy({ where: { menuId: req.params.id } }).then(() => {
                const newMealMenus = [];
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
              this.getMenuById(update.id).then((responseData) => {
                res.status(200).send({
                  message: 'Menu successfully updated',
                  menu: this.getMenusViewModel([responseData])[0],
                });
              });
            }
          }
        });
      } else {
        return res.status(404).send({ message: 'Menu not found' });
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
