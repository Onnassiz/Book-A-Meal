/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const MealsServices = require('../modelServices/MealsServices');

class MealsController {
  getMeals(req, res) {
    const meals = MealsServices.getAllMeals();
    res.status(200).send(meals);
  }

  getMealById(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = MealsServices.getSingleMeal(id);

    if (meal) {
      res.status(200).send(meal);
    } else {
      res.status(404).send('Meal not found');
    }
  }

  postMeal(req, res) {
    const meal = req.body;
    if (MealsServices.addMeal(meal)) {
      res.status(200).send('Meal successfully added');
    } else {
      res.status(400).send('No meal supplied');
    }
  }

  putMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = req.body;
    if (MealsServices.updateMeal(id, meal)) {
      res.status(200).send('Meal successfully updated');
    } else {
      res.status(404).send('Meal not found');
    }
  }

  deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    if (MealsServices.deleteMeal(id)) {
      res.status(200).send('Meal successfully deleted');
    } else {
      res.status(404).send('Meal not found');
    }
  }
}

module.exports = new MealsController();
