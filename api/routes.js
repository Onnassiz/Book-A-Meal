import AuthController from './controllers/AuthController';
import MenuController from './controllers/MenuController';
import MealController from './controllers/MealController';
import AddressController from './controllers/AddressController';
import ProfileController from './controllers/ProfileController';
import OrderController from './controllers/OrderController';

import { validateSignUpFormData, validateSignInFormData, verifyAuthToken, validateCatererToken, validateToken } from './middlewares/auth';
import { validateMealFormData, validateAddImageData } from './middlewares/meal';
import validateMenuFormData from './middlewares/menu';
import validateOrder from './middlewares/order';
import validateAddress from './middlewares/address';
import validateProfile from './middlewares/profile';


export default function routes(app) {
	app.post('/auth/signUp', validateSignUpFormData, AuthController.signUp);
	app.post('/auth/signIn', validateSignInFormData, AuthController.signIn);

	app.get('/meals', verifyAuthToken, validateCatererToken, MealController.getMeals);
	app.get('/meals/:id', verifyAuthToken, validateCatererToken, MealController.getMealById);
	app.post('/meals', verifyAuthToken, validateCatererToken, validateMealFormData, MealController.postMeal);
	app.put('/meals/:id', verifyAuthToken, validateCatererToken, validateMealFormData, MealController.putMeal);
	app.put('/meals/image/:id', verifyAuthToken, validateCatererToken, validateAddImageData, MealController.putImage);
	app.delete('/meals/:id', verifyAuthToken, validateCatererToken, MealController.deleteMeal);
	app.get('/meals/user/:id', verifyAuthToken, validateCatererToken, MealController.getUserAndMeals);

	app.get('/menus', verifyAuthToken, validateCatererToken, MenuController.getMenus);
	app.get('/menus/:id', verifyAuthToken, validateCatererToken, MenuController.getMenuAndMeals);
	app.get('/menus/user/:id', verifyAuthToken, validateCatererToken, MenuController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', verifyAuthToken, validateToken, MenuController.getMenusByTimeStamp);
	app.post('/menus', validateMenuFormData, verifyAuthToken, validateCatererToken, MenuController.postMenu);
	app.put('/menus/:id', validateMenuFormData, verifyAuthToken, validateCatererToken, MenuController.putMenu);
	app.delete('/menus/:id', verifyAuthToken, validateCatererToken, MenuController.deleteMenu);

	app.get('/orders', verifyAuthToken, validateCatererToken, OrderController.getAllOrders);
	app.get('/orders/:id', verifyAuthToken, validateToken, OrderController.getOrderById);
	app.get('/orders/caterer/:id', verifyAuthToken, validateCatererToken, OrderController.getOrdersByCatererId);
	app.post('/orders', verifyAuthToken, validateToken, validateOrder, OrderController.postOrder);
	app.put('/orders/:id', verifyAuthToken, validateToken, validateOrder, OrderController.putOrder);

	app.get('/address/user/:userId', verifyAuthToken, validateToken, AddressController.getUserAddresses);
	app.get('/address/:id', verifyAuthToken, validateToken, AddressController.getAddress);
	app.post('/address', validateAddress, verifyAuthToken, validateToken, AddressController.postAddress);
	app.put('/address/:id', verifyAuthToken, validateToken, validateAddress, AddressController.putAddress);

	app.get('/profile/:id', verifyAuthToken, validateCatererToken, ProfileController.getProfile);
	app.post('/profile', verifyAuthToken, validateCatererToken, validateProfile, ProfileController.postProfile);
	app.put('/profile/:id', verifyAuthToken, validateCatererToken, validateProfile, ProfileController.putProfile);
}

