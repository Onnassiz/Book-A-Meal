import MealController from '../controllers/MealController';
import ProfileController from '../controllers/ProfileController';
import { mealFormConstraints, mealUpdateFormConstraints } from '../middlewares/meal';
import { verifyAuthToken, validateCatererToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId, validateQueryString } from '../middlewares/validate';


export default function mealRoutes(app) {
  app.get('/meals', verifyAuthToken, validateCatererToken, validateQueryString, validateFormData, MealController.getMeals);
  app.get('/meals/menu/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getMealsInMenu);
  app.get('/meals/order/:id', verifyAuthToken, validateToken, validParamId, validateFormData, MealController.getMealsInOrder);
  app.get('/meals/menus/', verifyAuthToken, validateToken, validateQueryString, validateFormData, MealController.getMealsInDailyMenu);
  app.get('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getMealById);
  app.post('/meals', verifyAuthToken, validateCatererToken, mealFormConstraints, validateFormData, ProfileController.verifyProfile, MealController.postMeal);
  app.put('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, mealUpdateFormConstraints, validateFormData, ProfileController.verifyProfile, MealController.putMeal);
  app.delete('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.deleteMeal);
}
