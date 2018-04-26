import express from 'express';
import bodyParser from 'body-parser';

const apiRouter = express.Router();
const app = express();


app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());


app.get('/api', (req, res) => res.send('Welcome to Book-A-Meal'));

app.use('/api/v1', apiRouter);

const UsersController = require('./controllers/UsersController');
const MealsController = require('./controllers/MealsController');

const usersEndpoints = new UsersController(apiRouter);
const mealsEndpoints = new MealsController(apiRouter);


app.listen(3002, () => console.log('App running at port 3002.'));
