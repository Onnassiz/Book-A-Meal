import AuthController from './controllers/AuthController';
import MenuController from './controllers/MenuController';
import MealController from './controllers/MealController';
import ProfileController from './controllers/ProfileController';
import OrderController from './controllers/OrderController';

import { signInConstraints, signUpConstraints, verifyAuthToken, validateCatererToken, validateToken } from './middlewares/auth';
import { validateFormData, validParamId } from './middlewares/validate';
import { mealFormConstraints, mealImageConstraints } from './middlewares/meal';
import menuFormConstraints from './middlewares/menu';
import orderFormConstraints from './middlewares/order';
import profileFormConstraints from './middlewares/profile';


export default function routes(app) {
	app.post('/auth/signUp', signUpConstraints, validateFormData, AuthController.signUp);
	app.post('/auth/signIn', signInConstraints, validateFormData, AuthController.signIn);

	app.get('/meals', verifyAuthToken, validateCatererToken, MealController.getMeals);
	app.get('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getMealById);
	app.post('/meals', verifyAuthToken, validateCatererToken, mealFormConstraints, validateFormData, MealController.postMeal);
	app.put('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, mealFormConstraints, validateFormData, MealController.putMeal);
	app.put('/meals/image/:id', verifyAuthToken, validateCatererToken, validParamId, mealImageConstraints, validateFormData, MealController.putImage);
	app.delete('/meals/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.deleteMeal);
	app.get('/meals/user/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MealController.getUserAndMeals);

	app.get('/menus', verifyAuthToken, validateCatererToken, MenuController.getMenus);
	app.get('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.getMenuAndMeals);
	app.get('/menus/user/:id', verifyAuthToken, validateCatererToken, MenuController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', verifyAuthToken, validateToken, MenuController.getMenusByTimeStamp);
	app.post('/menus', verifyAuthToken, validateCatererToken, menuFormConstraints, validateFormData, MenuController.postMenu);
	app.put('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, mealFormConstraints, validateFormData, MenuController.putMenu);
	app.delete('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.deleteMenu);

	app.get('/orders', verifyAuthToken, validateCatererToken, OrderController.getAllOrders);
	app.get('/orders/:id', verifyAuthToken, validateToken, validParamId, validateFormData, OrderController.getOrderById);
	app.get('/orders/user/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, OrderController.getOrdersByUserId);
	app.post('/orders', verifyAuthToken, validateToken, orderFormConstraints, validateFormData, OrderController.postOrder);
	app.put('/orders/:id', verifyAuthToken, validateToken, validParamId, orderFormConstraints, validateFormData, OrderController.putOrder);

	app.get('/profile/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, ProfileController.getProfile);
	app.post('/profile', verifyAuthToken, validateCatererToken, profileFormConstraints, validateFormData, ProfileController.postProfile);
	app.put('/profile/:id', verifyAuthToken, validateCatererToken, validParamId, profileFormConstraints, validateFormData, ProfileController.putProfile);
}

