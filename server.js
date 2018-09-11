/* eslint-disable */

require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes';
import path from 'path';

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

const apiRouter = express.Router();
const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));

const cors = require('cors');
app.use(cors());

const port = process.env.NODE_ENV === 'test' ?process.env.TEST_PORT : process.env.PORT;

app.set('port', port || 3008);

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(bodyParser.json());

app.get('/api/v1', (req, res) => res.send('Welcome to Book-A-Meal'));
app.get('/', (req, res) => res.send('Welcome to Book-A-Meal'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', apiRouter);

app.use(function(req, res, next) {
  res.status(404).send({ message: 'The resource you are trying to consume does not exist' });
});

routes(apiRouter);

app.listen(app.get('port'), () => console.log('App running at port', app.get('port')));

