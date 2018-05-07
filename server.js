/* eslint-disable */

require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes';


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
// require('./api/routes')(apiRouter);
// 

routes(apiRouter);


app.listen(app.get('port'), () => console.log('App running at port', app.get('port')));

