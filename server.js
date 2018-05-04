/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const models = require('./api/models');


const sequelize = new Sequelize('book_a_meal_development', 'ben', 'ben', {
	host: 'localhost',
	dialect: 'postgres',
	operatorsAliases: false,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

models.sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((err) => {
	console.error('Unable to connect to the database:', err);
});


const apiRouter = express.Router();
const app = express();

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(bodyParser.json());


app.get('/api/v1', (req, res) => res.send('Welcome to Book-A-Meal'));

app.use('/api/v1', apiRouter);

// app.use('/api', router);
require('./api/routes')(apiRouter);


app.listen(app.get('port'), () => console.log('App running at port', app.get('port')));

