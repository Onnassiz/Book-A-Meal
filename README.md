<a href="https://travis-ci.org/Onnassiz/Book-A-Meal">
  <img src="https://travis-ci.org/Onnassiz/Book-A-Meal.svg?branch=develop" alt="travis">
</a>
<a href='https://coveralls.io/github/Onnassiz/Book-A-Meal?branch=develop'>
  <img src='https://coveralls.io/repos/github/Onnassiz/Book-A-Meal/badge.svg?branch=develop' alt='Coverage Status' />
</a>
<a href="https://codeclimate.com/github/Onnassiz/Book-A-Meal/maintainability">
  <img src="https://api.codeclimate.com/v1/badges/219224f1c0c06ec8fb79/maintainability" />
</a>
<a href="https://houndci.com">
  <img src="https://img.shields.io/badge/Protected%20by-hound-blue.svg" />
</a>


# Book-A-Meal
Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat. The custom name for this app is <b>Just Eat</b>
This is a simple UI design for Book-A-Meal application. This UI has the following features.

<h1>Links</h1>
<ul>
  <li>Github Pages: <a href="https://onnassiz.github.io/Book-A-Meal/UI">UI</a></li>
  <li>Pivotal Tracker: <a href="https://www.pivotaltracker.com/n/projects/2165782">PT</a></li>
  <li>Heroku Api Host: <a href="https://mealbooker.herokuapp.com/api/v1">API</a></li>
  <li>Heroku UI Host: <a href="https://mealbooker.herokuapp.com">React UI</a></li>

  <li>Api Documentation: <a href="https://mealbooker.herokuapp.com/api-docs">API Docs</a></li>
  <li>React Client Host: </li>
</ul>


<h1>API</h1>
This app's uses and node express api with the following testing kits:
<ul>
  <li>Mocha</li>
  <li>request</li>
  <li>chai</li>
  <li>TravisCI</li>
  <li>Coveralls</li>
</ul>
All api files (models, controllers) goes in the <b>api</b> directory and all test files goes in the <b>test</b> directory.

This app also has CI badges obtained from <b>Travis, Coveralls, Code Climate, and Hound</b> as shown above.
<h1>UI</h1>
The UI of this application is written in react. React app has the following major components
<ul>
  <li><b>Home Page:</b> This component has a carousel of meals and contains text and images about the app.</li>
  <li><b>Auth Page:</b> This page contains the sign up and sign in form for authentication.</li>
  <li><b>Admin Profile Page:</b> This is the page where a potential caterers visits in order to setup a business profile.</li>
  <li><b>Admin Meal Management Page:</b> This is the page where a caterer visits to add and modify meals to his/her kitchen.</li>
  <li><b>Admin Menu Management Page:</b> This is page where an caterer can add and manage daily menus.</li>
  <li><b>User Menu Page:</b> This is the page where users/customers visit to see menus for a particular day and add meals from these menus to the cart.</li>
  <li><b>Cart:</b> This Component slides out the left of the UI for a user to modify a cart and checkout.</li>
  <li><b>Orders:</b> This is the page where customers visit to see their order history.</li>
</ul>

<h1>Installation</h1>
Follow the guideline below for how to setup this app locally.
<hr />
<h2>API</h2>
<ul>
<li>Install Postgres SQL.</li>
<li>Install Node.js and NPM.</li>
<li>Run <code>npm install</code></li>
<li>Setup a <code>.env</code> file using the guide in .env-example in the root directory.</li>
<li>Create two databases <code>book_a_meal_test</code> and <code>book_a_meal_development</code>.</li>
<li>Add a USER <code>ben</code> and PASSWORD <code>ben</code> to the databases created.</li>
<li>Install sequelize npm package globally.</li>
<li>Navigate to the project root folder on terminal and run <code>sequelize db:migrate</code>.</li>
<li>Now run <code>npm start</code> to start the express server.</li>
</ul>
<br />
<h2>React Client</h2>
<ul>
<li>Navigate to the <code>client</code> directory on terminal.</li>
<li>Run <code>npm install</code>.</li>
<li>Setup a <code>.env</code> file using the guide in .env-example in the root directory.</li>
<li>Run <code>npm start</code> to start the React.js client</li>
</ul>

`Note`: You can start both the client and server by running `npm run starter` from either the client directory or the main directory
