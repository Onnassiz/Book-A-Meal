<a href="https://travis-ci.org/Onnassiz/Book-A-Meal"><img src="https://travis-ci.org/Onnassiz/Book-A-Meal.svg?branch=user-account" alt="travis"></a>
<a href='https://coveralls.io/github/Onnassiz/Book-A-Meal?branch=user-account'><img src='https://coveralls.io/repos/github/Onnassiz/Book-A-Meal/badge.svg?branch=user-account' alt='Coverage Status' /></a>


# Book-A-Meal
Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat. The custom name for this app is <b>Just Eat</b>
This is a simple UI design for Book-A-Meal application. This UI has the following features.
<h1>API Setup</h1>
This app's uses and node express api with the following testing kits:
<ul>
  <li>Mocha</li>
  <li>request</li>
  <li>chai</li>
  <li>TravisCI</li>
  <li>Coveralls</li>
</ul>
All api files (model, controllers, routes) goes in the <b>api</b> directory and all test files goes in the <b>test</b> directory.
<h1>UI Features</h1>
<ul>
  <li><b>Top Nav:</b> contains links basic client pages (menu, orders, cart) and a signin button</li>
  <li><b>Homepage:</b> contains a fixed banner, a description of <b>Just Eat</b> objectives, and 'hot deals' cards</li>
  <li><b>Admin Panel:</b> with the assumtion that the signed user is an admin, every page (except signin/signup) has an Admin panel floated to the right. These panels contain links to admin pages</li>
  <li><b>Signin/SignUp Pages:</b> contains sign in and sign up forms respectively. Sigup page can only be accessed through the Signin page</li>
  <li><b>Menu page:</b> Contains menu for the current day, a datepicker input box to let users choose a date, and a next and prev button to let user navigate throug dates.</li>
  <li><b>Manage meals:</b> contains a table of all meals and a form to allow an admin add new meal. This form is hanlde in a js file and adds meals to the table.</li>
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
