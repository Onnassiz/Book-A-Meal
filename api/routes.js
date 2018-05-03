const auth = require('./middlewares/auth');
const meal = require('./middlewares/meal');
const menu = require('./middlewares/menu');

const UsersController = require('./controllers/UsersController');
const MealsController = require('./controllers/MealsController');
const MenusController = require('./controllers/MenusController');
const OrdersController = require('./controllers/OrdersController');
const AuthController = require('./controllers/AuthController');

module.exports = (app) => {
	app.get('/meals', MealsController.getMeals);
	app.get('/meals/:id', MealsController.getMealById);
	app.post('/meals', meal.validateMealFormData, MealsController.postMeal);
	app.put('/meals/:id', meal.validateMealFormData, MealsController.putMeal);
	app.put('/meals/image/:id', meal.validateAddImageData, MealsController.putImage);
	app.delete('/meals/:id', MealsController.deleteMeal);

	app.get('/menus/:id', MenusController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', MenusController.getMenusByTimeStamp);
	app.get('/menus/meals/:id', MenusController.getMenuAndMeals);
	app.post('/menus', menu.validateMenuFormData, MenusController.postMenu);
	app.put('/menus/:id', menu.validateMenuFormData, MenusController.putMenu);
	app.delete('/menus/:id', MenusController.deleteMenu);

	app.get('/orders', OrdersController.getAllOrders);
	app.get('/orders/:id', OrdersController.getOrderById);
	app.get('/orders/user/:userId', OrdersController.getOrdersByUserId);
	app.post('/orders', OrdersController.postOrder);
	app.put('/orders/:id', OrdersController.putOrder);

	app.get('/meals/user/:id', UsersController.getUserAndMeals);

	app.post('/auth/signUp', auth.validateSignUpFormData, AuthController.signUp);
	app.post('/auth/signIn', auth.validateSignInFormData, AuthController.signIn);
};

