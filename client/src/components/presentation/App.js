import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Footer from '../presentation/layout/Footer';
import NoMatchComponent from '../presentation/partials/NoMatchComponent';
import UserHomePage from '../pages/UserHomePage';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import Meals from '../pages/Meals';
import AdminMenus from '../pages/AdminMenus';
import Menus from '../pages/Menus';
import Cart from '../pages/Cart';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  componentWillMount() {
    axios.defaults.baseURL = process.env.API_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { setUser } = this.props;
      const id = localStorage.getItem('id');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      const user = { id, name, email, role };

      setUser(user);
      this.setSignedIn();
    }
  }

  componentWillReceiveProps() {
    const $this = this;
    setTimeout(() => {
      $this.setCart();
    }, 500);
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
        <Route exact path="/cart" component={Cart} />
        <Route component={NoMatchComponent} />
      </Switch>
    );
    return (
      <div>
        <main>
          {this.state.isSignedIn ? userRoutes : guestRoutes}
        </main>
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
