const meals = require('../mockups/meals');
const util = require('./util');


class MealsServices {
  constructor(_meals) {
    this.meals = _meals;
  }

  getAllMeals() {
    return this.meals;
  }

  getSingleMeal(id) {
    return this.meals.find(x => x.id === id);
  }

  addMeal(meal) {
    if (util.isEmpty(meal)) {
      return false;
    }
    this.meals.push(meal);
    return true;
  }

  deleteMeal(id) {
    const index = this.meals.findIndex(x => x.id === id);
    if (index !== -1) {
      this.meals.splice(index, 1);
      return true;
    }
    return false;
  }

  updateMeal(id, _meal) {
    const index = this.meals.findIndex(x => x.id === id);
    if (index !== -1) {
      this.meals[index] = _meal;
      return true;
    }
    return false;
  }
}

module.exports = new MealsServices(meals);
