const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = express.Router();
const app = express();

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());


app.get('/api/v1', (req, res) => res.send('Welcome to Book-A-Meal'));

app.use('/api/v1', apiRouter);

const UsersController = require('./api/controllers/UsersController');
const MealsController = require('./api/controllers/MealsController');
const MenusController = require('./api/controllers/MenusController');
const OrdersController = require('./api/controllers/OrdersController');

const usersEndpoints = new UsersController(apiRouter);
const mealsEndpoints = new MealsController(apiRouter);
const menusEndpoints = new MenusController(apiRouter);
const ordersEndpoints = new OrdersController(apiRouter);


app.listen(app.get('port'), () => console.log('App running at port', app.get('port')));

