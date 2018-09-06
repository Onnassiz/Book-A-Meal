import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import empty from 'is-empty';

const logo = 'https://res.cloudinary.com/onnassiz/image/upload/v1535988132/logo_madffu.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: '',
    };
    this.signOut = this.signOut.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  setShowState(show) {
    this.setState({ show: empty(this.state.show) ? show : '' });
  }

  toggleShow() {
    const { user } = this.props;
    if (user.role === 'caterer') {
      this.setShowState('showAdmin');
    } else {
      this.setShowState('show');
    }
  }

  signOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    setTimeout(() => {
      window.location = '/';
    }, 500);
  }

  renderNavLeft() {
    const { user, page } = this.props;
    return (
      <div className="nav-left">
        <ul>
          {user.role === 'caterer' ?
            <li>
              <div className="dropdown">
                <a className={page === 'caterer' ? 'active' : ''}>{'Caterer\'s Workshop'}<i id="caret" className="material-icons">arrow_drop_down</i></a>
                <div className="dropdown-container">
                  <div className="dropdown-content">
                    <Link to="/caterer/business_profile"><i className="material-icons">dashboard</i> Setup Profile</Link>
                    <hr />
                    <Link to="/caterer/meals"><i className="material-icons">donut_small</i> Manage Meals</Link>
                    <Link to="/caterer/menus"><i className="material-icons">menu</i> Manage Menus</Link>
                    <hr />
                    <a href="pages/admin/manage-menu.html"><i className="material-icons">developer_board</i> View Reports</a>
                  </div>
                </div>
              </div>
            </li> : ''}
        </ul>
      </div>
    );
  }

  renderDropDown() {
    const { user } = this.props;
    const initials = empty(user) ? '' : user.name.match(/\b(\w)/g).join('').toUpperCase();
    return (
      <div className="dropdown">
        <button className="user-button"><a>{initials}<i id="caret" className="material-icons">arrow_drop_down</i></a></button>
        <div className="dropdown-container">
          <div className="dropdown-content">
            <div className="avatar-circle">
              <span className="initials">
                {initials}
              </span>
            </div>
            <hr />
            <Link to="/profile"><i className="material-icons">settings</i> Profile</Link>
            <hr />
            <a onClick={this.signOut} id="signOut"><i className="material-icons">power_settings_new</i> Sign Out</a>
          </div>
        </div>
      </div>
    );
  }

  renderMainNav() {
    const { user, page } = this.props;
    return (
      <div className="nav">
        {!empty(user) ?
          <ul>
            <li className={page === 'menus' ? 'active' : ''}><Link className="main" to="/menus">Menu</Link></li>
            <li className={page === 'orders' ? 'active' : ''}><Link to="/orders" className="main">Orders</Link></li>
            <li>
              {this.renderDropDown()}
            </li>
          </ul> :
          <ul>
            <li><Link to="/auth/register"><button className="auth-button">Sign Up</button></Link></li>
            <li><Link to="/auth/login"><button className="auth-button">Login</button></Link></li>
          </ul>}
      </div>
    );
  }

  renderMobileMenuIcon() {
    return (
      <div className="menuIcon">
        <ul>
          <li>
            <button id="menuIcon" onClick={this.toggleShow}>
              <i style={{ fontSize: 30 }} className="material-icons">menu</i>
            </button>
          </li>
        </ul>
      </div>
    );
  }

  renderMobileAdmin() {
    return (
      <div>
        <hr />
        <li><Link className="main" to="/caterer/business_profile"><i className="material-icons">dashboard</i> Setup Profile</Link></li>
        <li><Link className="main" to="/caterer/meals"><i className="material-icons">donut_small</i> Manage Meals</Link></li>
        <li><Link className="main" to="/caterer/menus"><i className="material-icons">menu</i> Manage Menus</Link></li>
      </div>
    );
  }

  renderMobileNav() {
    const { user, page } = this.props;
    return (
      <div>
        {empty(user) ?
          <ul className={`responsive ${this.state.show}`}>
            <li><Link className="main" to="/auth/login">Sign In</Link></li>
            <li><Link className="main" to="/auth/register">Sign Up</Link></li>
          </ul> :
          <ul className={`responsive ${this.state.show}`}>
            <li className={page === 'menus' ? 'active' : ''}><Link className="main" to="/menus">Menu</Link></li>
            <li><Link to="/orders" className="main">Orders</Link></li>
            {this.state.show === 'showAdmin' ? this.renderMobileAdmin() : ''}
            <hr />
            <a className="main" onClick={this.signOut}><i className="material-icons">power_settings_new</i> Sign Out</a>
          </ul>}
      </div>
    );
  }

  render() {
    return (
      <header>
        <h1 className="logo"><Link to="/"><img src={logo} alt="logo" /></Link></h1>
        {this.renderNavLeft()}
        {this.renderMainNav()}
        {this.renderMobileMenuIcon()}
        {this.renderMobileNav()}
      </header>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default NavBar;
