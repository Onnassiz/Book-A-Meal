const auth = require('./middlewares/auth');
const meal = require('./middlewares/meal');
const menu = require('./middlewares/menu');
const order = require('./middlewares/order');
const address = require('./middlewares/address');
const profile = require('./middlewares/profile');

const MealController = require('./controllers/MealController');
const MenuController = require('./controllers/MenuController');
const OrderController = require('./controllers/OrderController');
const AuthController = require('./controllers/AuthController');
const AddressController = require('./controllers/AddressController');
const ProfileController = require('./controllers/ProfileController');

module.exports = (app) => {
	app.post('/auth/signUp', auth.validateSignUpFormData, AuthController.signUp);
	app.post('/auth/signIn', auth.validateSignInFormData, AuthController.signIn);

	app.get('/meals', auth.verifyAuthToken, auth.validateCatererToken, MealController.getMeals);
	app.get('/meals/:id', auth.verifyAuthToken, auth.validateCatererToken, MealController.getMealById);
	app.post('/meals', auth.verifyAuthToken, auth.validateCatererToken, meal.validateMealFormData, MealController.postMeal);
	app.put('/meals/:id', auth.verifyAuthToken, auth.validateCatererToken, meal.validateMealFormData, MealController.putMeal);
	app.put('/meals/image/:id', auth.verifyAuthToken, auth.validateCatererToken, meal.validateAddImageData, MealController.putImage);
	app.delete('/meals/:id', auth.verifyAuthToken, auth.validateCatererToken, MealController.deleteMeal);
	app.get('/meals/user/:id', auth.verifyAuthToken, auth.validateCatererToken, MealController.getUserAndMeals);

	app.get('/menus', auth.verifyAuthToken, auth.validateCatererToken, MenuController.getMenus);
	app.get('/menus/:id', auth.verifyAuthToken, auth.validateCatererToken, MenuController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', auth.verifyAuthToken, auth.validateToken, MenuController.getMenusByTimeStamp);
	app.post('/menus', menu.validateMenuFormData, auth.verifyAuthToken, auth.validateCatererToken, MenuController.postMenu);
	app.put('/menus/:id', menu.validateMenuFormData, auth.verifyAuthToken, auth.validateCatererToken, MenuController.putMenu);
	app.delete('/menus/:id', auth.verifyAuthToken, auth.validateCatererToken, MenuController.deleteMenu);

	app.get('/orders', auth.verifyAuthToken, auth.validateCatererToken, OrderController.getAllOrders);
	app.get('/orders/:id', auth.verifyAuthToken, auth.validateToken, OrderController.getOrderById);
	app.get('/orders/caterer/:id', auth.verifyAuthToken, auth.validateCatererToken, OrderController.getOrdersByCatererId);
	app.post('/orders', auth.verifyAuthToken, auth.validateCatererToken, order.validateOrder, OrderController.postOrder);
	app.put('/orders/:id', auth.verifyAuthToken, auth.validateCatererToken, order.validateOrder, OrderController.putOrder);

	app.get('/address/user/:userId', auth.verifyAuthToken, auth.validateToken, AddressController.getUserAddresses);
	app.get('/address/:id', auth.verifyAuthToken, auth.validateToken, AddressController.getAddress);
	app.post('/address', address.validateAddress, auth.verifyAuthToken, auth.validateToken, AddressController.postAddress);
	app.put('/address/:id', auth.verifyAuthToken, auth.validateToken, AddressController.putAddress);

	app.get('/profile/:id', auth.verifyAuthToken, auth.validateCatererToken, ProfileController.getProfile);
	app.post('/profile', auth.verifyAuthToken, auth.validateCatererToken, profile.validateProfile, ProfileController.postProfile);
	app.put('/profile/:id', auth.verifyAuthToken, auth.validateCatererToken, profile.validateProfile, ProfileController.putProfile);
};

