import MealController from '../controllers/MealController';
import { mealFormConstraints, mealImageConstraints } from '../middlewares/meal';
import { verifyAuthToken, validateCatererToken } from '../middlewares/auth';
import { validateFormData, validParamId, validateQueryString } from '../middlewares/validate';


export default function mealRoutes(app) {
  app.get('/meals', verifyAuthToken, validateCatererToken, validateQueryString, validateFormData, MealController.getMeals);
  app.get('/meals/user/', verifyAuthToken, validateCatererToken, validateQueryString, validateFormData, MealController.getUserMeals);
  app.get('/meals/menu/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getMealsInMenu);
  app.get('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getMealById);
  app.post('/meals', verifyAuthToken, validateCatererToken, mealFormConstraints, validateFormData, MealController.postMeal);
  app.put('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, mealFormConstraints, validateFormData, MealController.putMeal);
  app.put('/meals/image/:id', verifyAuthToken, validateCatererToken, validParamId, mealImageConstraints, validateFormData, MealController.putImage);
  app.delete('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.deleteMeal);
}
