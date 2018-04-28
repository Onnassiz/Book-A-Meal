const { expect } = require('chai');
const { describe, it } = require('mocha');
const meals = require('../api/mockups/meals');

const MealsServices = require('../api/modelServices/MealsServices');

describe('Meal Model', () => {
  describe('Constructor', () => {
    it('meals should be an array of meals', () => {
      expect(Array.isArray(MealsServices.meals)).to.equal(true);
    });
  });


  describe('Get all meals', () => {
    it('should return all meals', () => {
      expect(MealsServices.getAllMeals()).to.equal(meals);
    });
  });

  describe('Get meal by ID', () => {
    it('should return meal for a specified id', () => {
      expect(MealsServices.getSingleMeal(1)).to.equal(meals[0]);
    });
  });

  describe('Delete meal', () => {
    it('should decrease the meals size by one', () => {
      const mealsLength = MealsServices.getAllMeals().length;
      MealsServices.deleteMeal(3);
      expect(MealsServices.getAllMeals().length).to.equal(mealsLength - 1);
    });

    it('should return false if meal is empty', () => {
      expect(MealsServices.deleteMeal(22)).to.equal(false);
    });
  });

  describe('Add to meals', () => {
    it('should increase the meals size by one', () => {
      const mealsLength = MealsServices.getAllMeals().length;
      const meal = {
        id: 14,
        name: 'Chicken Pa-Naeng',
        description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
        price: 2300,
        category: 'Dinner',
        image: '41.jpg',
      };

      MealsServices.addMeal(meal);
      expect(MealsServices.getAllMeals().length).to.equal(mealsLength + 1);
    });

    it('should return false if meal is empty', () => {
      expect(MealsServices.addMeal({})).to.equal(false);
    });
  });

  describe('Update meal', () => {
    it('should update the value of a specified meal', () => {
      const meal = {
        id: 8,
        name: 'Chicken Pa-Naeng',
        description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
        price: 2300,
        category: 'Dinner',
        image: '41.jpg',
      };
      expect(MealsServices.updateMeal(8, meal)).to.equal(true);
    });

    it('should return false if id is wrong', () => {
      expect(MealsServices.updateMeal(18, {})).to.equal(false);
    });
  });
});
