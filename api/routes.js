const UsersController = require('./controllers/UsersController');
const MealsController = require('./controllers/MealsController');
const MenusController = require('./controllers/MenusController');
const OrdersController = require('./controllers/OrdersController');

module.exports = (app) => {
  app.get('/meals', MealsController.getMeals);
  app.get('/meals/:id', MealsController.getMealById);
  app.post('/meals', MealsController.postMeal);
  app.put('/meals/:id', MealsController.putMeal);
  app.delete('/meals/:id', MealsController.deleteMeal);

  app.get('/menus', MenusController.getMenus);
  app.get('/menus/:timeStamp', MenusController.getMenuByTimeStamp);
  app.post('/menus', MenusController.postMenu);
  app.put('/menus/:timeStamp', MenusController.putMenu);

  app.get('/orders', OrdersController.getAllOrders);
  app.get('/orders/:id', OrdersController.getOrderById);
  app.get('/orders/user/:userId', OrdersController.getOrdersByUserId);
  app.post('/orders', OrdersController.postOrder);
  app.put('/orders/:id', OrdersController.putOrder);

  app.get('/users', UsersController.getUsers);
  app.get('/users/:id', UsersController.getSingleUser);
  app.post('/users', UsersController.postUser);
  app.put('/users/:id', UsersController.putUser);
  app.put('/users/role/:id', UsersController.changeRole);
  app.delete('/users/:id', UsersController.deleteUser);
  app.put('/users/block/:id', UsersController.blockUser);
};

