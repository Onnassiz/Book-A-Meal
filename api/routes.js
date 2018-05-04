const auth = require('./middlewares/auth');
const meal = require('./middlewares/meal');
const menu = require('./middlewares/menu');
const order = require('./middlewares/order');

const MealController = require('./controllers/MealController');
const MenuController = require('./controllers/MenuController');
const OrderController = require('./controllers/OrderController');
const AuthController = require('./controllers/AuthController');

module.exports = (app) => {
	app.get('/meals', MealController.getMeals);
	app.get('/meals/:id', MealController.getMealById);
	app.post('/meals', meal.validateMealFormData, MealController.postMeal);
	app.put('/meals/:id', meal.validateMealFormData, MealController.putMeal);
	app.put('/meals/image/:id', meal.validateAddImageData, MealController.putImage);
	app.delete('/meals/:id', MealController.deleteMeal);
	app.get('/meals/user/:id', MealController.getUserAndMeals);

	app.get('/menus/:id', MenuController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', MenuController.getMenusByTimeStamp);
	app.get('/menus/meals/:id', MenuController.getMenuAndMeals);
	app.post('/menus', menu.validateMenuFormData, MenuController.postMenu);
	app.put('/menus/:id', menu.validateMenuFormData, MenuController.putMenu);
	app.delete('/menus/:id', MenuController.deleteMenu);

	app.get('/orders', OrderController.getAllOrders);
	app.get('/orders/:id', OrderController.getOrderById);
	app.get('/orders/caterer/:id', OrderController.getOrdersByCatererId);
	app.post('/orders', order.validateOrder, OrderController.postOrder);
	app.put('/orders/:id', order.validateOrder, OrderController.putOrder);

	app.post('/auth/signUp', auth.validateSignUpFormData, AuthController.signUp);
	app.post('/auth/signIn', auth.validateSignInFormData, AuthController.signIn);
};

