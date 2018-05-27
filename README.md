<a href="https://travis-ci.org/Onnassiz/Book-A-Meal"><img src="https://travis-ci.org/Onnassiz/Book-A-Meal.svg?branch=profile-setup" alt="travis"></a>
<a href='https://coveralls.io/github/Onnassiz/Book-A-Meal?branch=profle-setup'><img src='https://coveralls.io/repos/github/Onnassiz/Book-A-Meal/badge.svg?branch=profle-setup' alt='Coverage Status' /></a> <a href="https://codeclimate.com/github/Onnassiz/Book-A-Meal/maintainability"><img src="https://api.codeclimate.com/v1/badges/219224f1c0c06ec8fb79/maintainability" /></a>


# Book-A-Meal
Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat. The custom name for this app is <b>Just Eat</b>
This is a simple UI design for Book-A-Meal application. This UI has the following features.

<h1>Links</h1>
<ul>
  <li>Github Pages: <a href="https://onnassiz.github.io/Book-A-Meal/UI">UI</a></li>
  <li>Pivotal Tracker: <a href="https://www.pivotaltracker.com/n/projects/2165782">PT</a></li>
  <li>Heroku Api Host: <a href="https://mealbooker.herokuapp.com/api/v1">API</a></li>
  <li>Api Documentation: <a href="https://mealbooker.herokuapp.com/api-docs">API Docs</a></li>
  <li>React Client Host: </li>
</ul>


<h1>API Setup</h1>
This app's uses and node express api with the following testing kits:
<ul>
  <li>Mocha</li>
  <li>request</li>
  <li>chai</li>
  <li>TravisCI</li>
  <li>Coveralls</li>
</ul>
All api files (models, controllers) goes in the <b>api</b> directory and all test files goes in the <b>test</b> directory.

This app will at this stage use json mock data for api endpoint testing.

This app also have CI badges obtained from <b>Travis, Coveralls, and Code Climate</b> as shown above.
<h1>UI Features</h1>
<ul>
  <li><b>Top Nav:</b> contains links basic client pages (menu, orders, cart) and a signIn button</li>
  <li><b>Homepage:</b> contains a fixed banner, a description of <b>Just Eat</b> objectives, and 'hot deals' cards</li>
  <li><b>Admin Panel:</b> with the assumption that the signed user is an admin, every page (except signIn/signUp) has an Admin panel floated to the right. These panels contain links to admin pages</li>
  <li><b>SignIn/SignUp Pages:</b> contains sign in and sign up forms respectively. SignUp page can only be accessed through the SignIn page</li>
  <li><b>Menu page:</b> Contains menu for the current day, a datepicker input box to let users choose a date, and a next and prev button to let user navigate through dates.</li>
  <li><b>Manage meals:</b> contains a table of all meals and a form to allow an admin add new meal. This form is handle in a js file and adds meals to the table.</li>
  <li><b>Manage menu:</b> contains menu for all days and a form through which an admin can add menu</li>
  <li><b>Report:</b> contains applications daily reports</li>
</ul>

<h1>Empty UI Pages</h1>
The following pages could not be designed because of time and are thereby left empty
<ul>
  <li>Manage Users</li>
  <li>Orders</li>
  <li>Cart</li>
</ul>

<h1>Missing UI features</h1>
The following features could not be designed because of time constraint
<ul>
  <li>Site is not completely mobile responsive</li>
  <li>No footer design</li>
  <li>Etc</li>
</ul>
