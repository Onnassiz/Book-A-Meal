/* eslint no-param-reassign: 0 */
import { menu, meal, menuMeal, user, profile } from '../models';
import { menuViewModelFromArray, getMenusViewModel, buildMenus } from './Util';

class MenusController {
  constructor() {
    this.postMenu = this.postMenu.bind(this);
    this.putMenu = this.putMenu.bind(this);
    this.getMenusByUserId = this.getMenusByUserId.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.getMenuByIdParam = this.getMenuByIdParam.bind(this);
    this.mapMenusToMeals = this.mapMenusToMeals.bind(this);
  }

  getMenusByUserId(req, res) {
    menu.count({ where: { userId: req.user.id } }).then((count) => {
      menu.findAll({
        include: [{
          model: meal,
        }],
        where: { userId: req.user.id },
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
        order: [['date', 'DESC']],
      }).then((menus) => {
        res.status(200).send({
          count,
          menus: getMenusViewModel(menus),
        });
      });
    });
  }

  getMenuById(id) {
    return menu.findOne({
      include: [{
        model: meal,
      }],
      where: { id },
    }).then(responseData => responseData);
  }

  getMenuByIdParam(req, res) {
    menu.findOne({
      include: [{
        model: meal,
      }],
      where: { id: req.params.id, userId: req.user.id },
    }).then((responseData) => {
      if (responseData) {
        res.status(200).send(getMenusViewModel([responseData])[0]);
      } else {
        res.status(404).send({ message: 'Menu not found' });
      }
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
      res.status(200).send(menuViewModelFromArray(responseData));
    });
  }

  verifyMealsInMenu(req, res, next) {
    const { meals } = req.body;
    if (meals) {
      meals.forEach((item, i) => {
        meal.findOne({ where: { id: item.mealId } }).then((foundMeal) => {
          if (!foundMeal) {
            next();
          } else if (foundMeal.userId !== req.user.id) {
            res.status(401).send({
              message: `This meal, ${foundMeal.name}, was added by another user. You can only use meals created by you.`,
            });
          } else if (i === meals.length - 1) {
            next();
          }
        });
      });
    } else {
      next();
    }
  }

  postMenu(req, res, next) {
    const { date, name, extraDays } = req.body;
    const userId = req.user.id;

    const newMenus = buildMenus({ name, date, userId }, extraDays);

    const dates = newMenus.map(item => item.date);

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
      });
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
        menus: getMenusViewModel(menus, meals.length),
        meals,
      });
    }).catch((error) => {
      res.status(400).send({ message: error.name });
    });
  }

  putMenu(req, res) {
    const { date, meals } = req.body;
    const userId = req.user.id;

    menu.findOne({ where: { id: req.params.id } }).then((existingMenu) => {
      if (existingMenu) {
        if (existingMenu.date !== date) {
          menu.findOne({ where: { userId, date } }).then((otherMenus) => {
            if (otherMenus) {
              res.status(400).send({
                message: 'You have already created a menu for the selected date. Please choose a different date.',
              });
            } else {
              this.updateMenu(req, res, date, meals, userId);
            }
          });
        } else {
          this.updateMenu(req, res, date, meals, userId);
        }
      } else {
        return res.status(404).send({ message: 'Menu not found' });
      }
    });
  }

  updateMenu(req, res, date, meals, userId) {
    menu.update(
      {
        id: req.params.id,
        name: req.body.name,
        date,
        userId,
      },
      { where: { id: req.params.id, userId: req.user.id }, returning: true },
    ).then((updated) => {
      const update = updated[1][0];
      if (update) {
        if (meals) {
          this.updateMealsInMenu(req, res, meals, update);
        } else {
          this.getMenuById(update.id).then((responseData) => {
            res.status(200).send({
              message: 'Menu successfully updated',
              menu: getMenusViewModel([responseData])[0],
            });
          });
        }
      }
    });
  }

  updateMealsInMenu(req, res, meals, update) {
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
            menu: getMenusViewModel([responseData])[0],
            meals,
          });
        });
      });
    });
  }

  deleteMenu(req, res) {
    menu.destroy({
      where: { id: req.params.id, userId: req.user.id },
    }).then((deleted) => {
      if (deleted) {
        res.status(200).send({
          message: 'Menu successfully deleted',
          menu: deleted,
        });
      } else {
        res.status(404).send({
          message: 'Menu not found',
        });
      }
    });
  }
}

export default new MenusController();
