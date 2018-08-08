import sequelize from 'sequelize';
import { meal, user, profile, menu } from '../models';

const { Op } = sequelize;

const mealViewModelFromArray = (meals) => {
  const viewModel = [];
  meals.forEach((item) => {
    viewModel.push({
      id: item.id,
      name: item.name,
      price: item.price,
      units: 1,
      totalPrice: item.price,
      userId: item.userId,
      category: item.category,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      caterer: item.user.profile === null ? null : item.user.profile.businessName,
      imageUrl: item.imageUrl,
    });
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
  getMeals(req, res) {
    const { offset, limit, searchKey } = req.query;
    meal.count({
      where: searchKey === undefined ? null :
        {
          [Op.or]: {
            name: { [Op.iLike]: `%${searchKey}%` },
            description: { [Op.iLike]: `%${searchKey}%` },
            category: { [Op.iLike]: `%${searchKey}%` },
          },
        },
    }).then((count) => {
      meal.findAll({ include: [{ model: user, include: [{ model: profile }] }],
        order: sequelize.literal('name'),
        offset: offset || 0,
        limit: limit || 10,
        where: searchKey === undefined ? null :
          {
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
    });
  }

  getMealsInMenu(req, res) {
    const { id } = req.params;
    const { limit, offset } = req.query;

    menu.findOne({
      where: { id },
      include: [{ model: meal }],
      limit: limit || 10,
      offset: offset || 0,
      attributes: ['name', 'date'],
      subQuery: false,
    }).then((data) => {
      res.status(200).send(data.meals);
    });
  }

  getMealsInDailyMenu(req, res) {
    const { date, limit, offset } = req.query;
    meal.count({
      include: [{ model: menu, where: { date } }],
    }).then((count) => {
      meal.findAll({
        include: [
          {
            model: menu,
            where: { date },
            attributes: [],
            order: sequelize.literal('createdAt'),
          },
          { model: user, include: [{ model: profile }] },
        ],
        limit: limit || 10,
        offset: offset || 0,
      }).then((meals) => {
        res.status(200).send({
          count,
          meals: mealViewModelFromArray(meals),
        });
      });
    });
  }

  getMealById(req, res) {
    meal.findById(req.params.id).then((ml) => {
      if (ml) {
        res.status(200).send(ml);
      } else {
        res.status(404).send({
          message: 'Meal not found',
        });
      }
    });
  }

  getUserMeals(req, res) {
    meal.count({ where: { userId: req.user.id } }).then((count) => {
      const { offset, limit } = req.query;

      meal.findAll({ include: [{ model: user, include: [{ model: profile }] }],
        order: sequelize.literal('name'),
        offset: offset || 0,
        limit: limit || 10,
        where: { userId: req.user.id },
      }).then((meals) => {
        const viewModel = mealViewModelFromArray(meals);
        res.status(200).send({
          count,
          meals: viewModel,
        });
      });
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
      { where: { id: req.params.id }, returning: true },
    ).then((updated) => {
      const update = updated[1][0];
      if (update) {
        meal.findOne({
          include: [{ model: user, include: [{ model: profile }] }],
          where: { id: update.id },
        }).then(returnedMeal => res.status(200).send({
          message: 'Meal successfully updated',
          meal: mealViewModel(returnedMeal),
        }));
      } else {
        res.status(404).send({
          message: 'Meal not found',
        });
      }
    });
  }

  deleteMeal(req, res) {
    meal.destroy({
      where: { id: req.params.id },
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
