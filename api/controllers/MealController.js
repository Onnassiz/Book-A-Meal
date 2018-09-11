import sequelize from 'sequelize';
import { meal, user, profile, menu, order } from '../models';

const { Op } = sequelize;

const mealViewModelFromArray = (meals, menuDate = '') => {
  const viewModel = [];
  meals.forEach((item) => {
    const thisModel = {
      id: item.id,
      name: item.name,
      price: item.price,
      totalPrice: item.price,
      units: 1,
      menuDate,
      userId: item.userId,
      category: item.category,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      imageUrl: item.imageUrl,
    };
    if (item.user.profile !== null) {
      thisModel.profileId = item.user.profile.id;
      thisModel.caterer = item.user.profile.businessName;
    }
    if (item.mealOrder) {
      thisModel.originalPrice = item.mealOrder.price;
      thisModel.units = item.mealOrder.units;
      thisModel.totalPrice = item.mealOrder.units * item.mealOrder.price;
    }
    viewModel.push(thisModel);
  });
  return viewModel;
};

const mealViewModel = (item) => {
  const viewModel = {
    id: item.id,
    name: item.name,
    price: item.price,
    userId: item.userId,
    category: item.category,
    description: item.description,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    caterer: item.user.profile === null ? null : item.user.profile.businessName,
    imageUrl: item.imageUrl,
  };
  return viewModel;
};

class MealsController {
  constructor() {
    this.getMeals = this.getMeals.bind(this);
    this.putMeal = this.putMeal.bind(this);
  }

  getMeals(req, res) {
    const { searchKey } = req.query;
    meal.count({
      where: searchKey === undefined ? { userId: req.user.id } :
        {
          userId: req.user.id,
          [Op.or]: {
            name: { [Op.iLike]: `%${searchKey}%` },
            description: { [Op.iLike]: `%${searchKey}%` },
            category: { [Op.iLike]: `%${searchKey}%` },
          },
        },
    }).then((count) => {
      this.findAllMeals(req, res, count);
    });
  }

  findAllMeals(req, res, count) {
    const { offset, limit, searchKey } = req.query;
    meal.findAll({
      include: [{ model: user, include: [{ model: profile }] }],
      order: sequelize.literal('name'),
      offset: offset || 0,
      limit: limit || 10,
      where: searchKey === undefined ? { userId: req.user.id } :
        {
          userId: req.user.id,
          [Op.or]: {
            name: { [Op.iLike]: `%${searchKey}%` },
            description: { [Op.iLike]: `%${searchKey}%` },
            category: { [Op.iLike]: `%${searchKey}%` },
          },
        },
    }).then((meals) => {
      const viewModel = mealViewModelFromArray(meals);
      res.status(200).send({ meals: viewModel, count });
    });
  }

  getMealsInMenu(req, res) {
    const { id } = req.params;
    const { limit, offset } = req.query;

    menu.findOne({
      where: { id },
      include: [{ model: meal }],
      limit: limit || null,
      offset: offset || 0,
      attributes: ['name', 'date'],
      subQuery: false,
    }).then((data) => {
      res.status(200).send(data.meals);
    });
  }

  getMealsInOrder(req, res) {
    const { id } = req.params;
    const { limit, offset } = req.query;

    order.findOne({
      where: { id },
      include: [
        {
          model: meal,
          include: [{ model: user, include: [{ model: profile }] }],
        },
      ],
      limit: limit || null,
      offset: offset || 0,
      subQuery: false,
    }).then((data) => {
      res.status(200).send(mealViewModelFromArray(data.meals));
    });
  }

  getMealsInDailyMenu(req, res) {
    const { date, limit, offset } = req.query;
    meal.findAndCountAll({
      distinct: true,
      include: [
        {
          model: menu,
          where: { date },
          attributes: ['date'],
          order: sequelize.literal('createdAt'),
        },
        { model: user, include: [{ model: profile }] },
      ],
      limit: limit || 10,
      offset: offset || 0,
    }).then((meals) => {
      res.status(200).send({
        count: meals.count,
        meals: mealViewModelFromArray(meals.rows, date),
      });
    });
  }

  getMealById(req, res) {
    meal.findOne({ where: { id: req.params.id, userId: req.user.id } }).then((ml) => {
      if (ml) {
        res.status(200).send(ml);
      } else {
        res.status(404).send({
          message: 'Meal not found',
        });
      }
    });
  }

  postMeal(req, res) {
    const newMeal = meal.build({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      userId: req.user.id,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });

    meal.findOne({ where: { name: newMeal.name, userId: newMeal.userId } }).then((existingMeal) => {
      if (existingMeal) {
        res.status(409).send({
          message: 'You have already created a meal with this name',
        });
      } else {
        newMeal.save().then((response) => {
          meal.findOne({
            include: [{ model: user, include: [{ model: profile }] }],
            where: { id: response.id },
          }).then(returnedMeal => res.status(201).send({
            message: 'Meal successfully created',
            meal: mealViewModel(returnedMeal),
          }));
        });
      }
    });
  }

  fetchUpdatedMeal(res, update) {
    meal.findOne({
      include: [{ model: user, include: [{ model: profile }] }],
      where: { id: update.id },
    }).then(returnedMeal => res.status(200).send({
      message: 'Meal successfully updated',
      meal: mealViewModel(returnedMeal),
    }));
  }

  putMeal(req, res) {
    meal.update(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        userId: req.user.id,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
      },
      { where: { id: req.params.id, userId: req.user.id }, returning: true },
    ).then((updated) => {
      const update = updated[1][0];
      if (update) {
        this.fetchUpdatedMeal(res, update);
      } else {
        res.status(404).send({
          message: 'Meal not found',
        });
      }
    });
  }

  deleteMeal(req, res) {
    const { id } = req.params;
    meal.destroy({
      where: { id, userId: req.user.id },
    }).then((deleted) => {
      if (deleted) {
        res.status(200).send({
          message: 'Meal successfully deleted',
        });
      } else {
        res.status(404).send({
          message: 'Meal not found',
        });
      }
    });
  }
}

export default new MealsController();
