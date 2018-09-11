import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../presentation/layout/Footer';
import NoMatchComponent from '../presentation/partials/NoMatchComponent';
import UserHomePage from '../pages/UserHomePage';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';
import Auth from '../pages/Auth';
import Meals from '../pages/Meals';
import AdminMenus from '../pages/AdminMenus';
import Menus from '../pages/Menus';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  componentWillMount() {
    const url = process.env.NODE_ENV === 'test' ? process.env.TEST_API_URL : process.env.API_URL;
    axios.defaults.baseURL = url;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { setUser } = this.props;
      const id = localStorage.getItem('id');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      const user = {
        id, name, email, role,
      };

      setUser(user);
      this.setSignedIn();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const { cart } = this.props;
      if (this.state.isSignedIn && !empty(cart.cart)) {
        this.setCart();
      }
    }, 1000);
  }

  setCart() {
    const { emptyCart, user, cart } = this.props;
    if (cart.owner !== user.id) {
      emptyCart();
    }
  }

  setSignedIn() {
    this.setState({ isSignedIn: true });
  }

  render() {
    const guestRoutes = (
      <Switch>
        <Route exact path="/" component={UserHomePage} />
        <Route exact path="/auth/:type" component={Auth} />
        <Route component={NoMatchComponent} />
      </Switch>
    );
    const userRoutes = (
      <Switch>
        <Route exact path="/" component={UserHomePage} />
        <Route exact path="/caterer/business_profile" component={Profile} />
        <Route exact path="/caterer/meals" component={Meals} />
        <Route exact path="/caterer/menus" component={AdminMenus} />
        <Route exact path="/menus" component={Menus} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/profile" component={UserProfile} />
        <Route component={NoMatchComponent} />
      </Switch>
    );
    return (
      <div>
        <main>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {this.state.isSignedIn ? userRoutes : guestRoutes}
        </main>
        {this.state.isSignedIn ? <Cart /> : ''}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  setUser: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default App;
