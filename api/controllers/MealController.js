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

const mealsInMenuModel = (meals) => {
  const viewModel = [];
  meals.forEach((item) => {
    viewModel.push({
      id: item.id,
      name: item.name,
      price: item.price,
      userId: item.userId,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
    });
  });

  return viewModel;
};

class MealsController {
  getMeals(req, res) {
    meal.findAll({ include: [{ model: user, include: [{ model: profile }] }], order: sequelize.literal('name') }).then((meals) => {
      const viewModel = mealViewModelFromArray(meals);
      res.status(200).send(viewModel);
    });
  }

  getMealsInMenu(req, res) {
    const { id } = req.params;

    menu.findOne({
      include: [{ model: meal, limit: 5 }],
      where: { id },
    }).then((data) => {
      // const viewModel = mealViewModelFromArray(meals);
      res.status(200).send(mealsInMenuModel(data.meals));
    });
  }

  getMealsWithOffsetAndLimit(req, res) {
    const { offset } = req.params;
    let { limit, searchKey } = req.params;

    if (!searchKey && limit) {
      if (Number.isNaN(parseInt(limit, 10))) {
        searchKey = limit;
        limit = undefined;
      }
    }

    meal.findAll({ include: [{ model: user, include: [{ model: profile }] }],
      order: sequelize.literal('name'),
      offset,
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
      res.status(200).send(viewModel);
    }).catch((error) => {
      res.status(400).send(error.name);
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
    const { offset, limit } = req.params;

    meal.findAll({ include: [{ model: user, include: [{ model: profile }] }],
      order: sequelize.literal('name'),
      offset,
      limit: limit || 10,
      where: { userId: req.user.id },
    }).then((meals) => {
      const viewModel = mealViewModelFromArray(meals);
      res.status(200).send(viewModel);
    }).catch((error) => {
      res.status(400).send(error.name);
    });
  }

  putImage(req, res) {
    meal.update(
      {
        imageUrl: req.body.imageUrl,
      },
      { where: { id: req.params.id }, returning: true },
    ).then((updated) => {
      const update = updated[1][0];
      if (update) {
        meal.findOne({
          include: [{ model: user, include: [{ model: profile }] }],
          where: { id: update.id },
        }).then(returnedMeal => res.status(200).send(mealViewModel(returnedMeal)));
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
        res.status(400).send({
          message: 'You have already created a meal with this name',
        });
      } else {
        newMeal.save().then((response) => {
          meal.findOne({
            include: [{ model: user, include: [{ model: profile }] }],
            where: { id: response.id },
          }).then(returnedMeal => res.status(201).send(mealViewModel(returnedMeal)));
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
        }).then(returnedMeal => res.status(200).send(mealViewModel(returnedMeal)));
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
