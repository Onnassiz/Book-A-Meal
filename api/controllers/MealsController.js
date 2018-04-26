/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const MealsServices = require('../modelServices/MealsServices');

class MealsController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/meals', this.getMeals.bind(this));
    this.router.get('/meals/:id', this.getMealById.bind(this));
    this.router.post('/meals', this.postMeal.bind(this));
    this.router.put('/meals/:id', this.putMeal.bind(this));
    this.router.delete('/meals/:id', this.deleteMeal.bind(this));
  }

  getMeals(req, res) {
    const meals = MealsServices.getAllMeals();
    res.send(meals);
  }

  getMealById(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = MealsServices.getSingleMeal(id);

    if (meal) {
      res.send(meal);
    } else {
      res.sendStatus(404);
    }
  }

  postMeal(req, res) {
    const meal = req.body;
    if (MealsServices.addMeal(meal)) {
      res.sendStatus(200);
    } else {
      res.status(400).send('No meal supplied');
    }
  }

  putMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = req.body;
    if (MealsServices.updateMeal(id, meal)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404).send('Meal not found');
    }
  }

  deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    if (MealsServices.deleteMeal(id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404).send('Meal not found');
    }
  }
}

module.exports = MealsController;
