import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => res.send('Welcome to Book-A-Meal'));
app.listen(3002, () => console.log('App running at port 3001.'));