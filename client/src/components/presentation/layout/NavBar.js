import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import Logo from '../../../../assets/images/logo.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: '',
    };
    this.signOut = this.signOut.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    const { user } = this.props;
    let show = '';
    if (user.role === 'caterer') {
      show = empty(this.state.show) ? 'showAdmin' : '';
    } else {
      show = empty(this.state.show) ? 'show' : '';
    }
    this.setState({ show });
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

  render() {
    const { user, page } = this.props;
    const initials = empty(user) ? '' : user.name.match(/\b(\w)/g).join('').toUpperCase();
    return (
			<header>
				<h1 className="logo"><Link to="/"><img src={Logo} alt="logo" /></Link></h1>
				<div className="nav-left">
					<ul>
						{user.role === 'caterer' ?
							<li>
								<div className="dropdown">
									<a className={page === 'caterer' ? 'active' : ''}>{'Caterer\'s Links'}</a>
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

				<div className="nav">
					{ !empty(user) ?
						<ul>
							<li className={page === 'menus' ? 'active' : ''}><Link className="main" to="/menus">Menu</Link></li>
							<li><Link to="/orders" className="main">Orders</Link></li>
							<li>
								<div className="dropdown">
									<button className="user-button"><a href="#">{initials}<i id="caret" className="material-icons">arrow_drop_down</i></a></button>
									<div className="dropdown-container">
										<div className="dropdown-content">
											<div className="avatar-circle">
												<span className="initials">
													{initials}
												</span>
											</div>
											<hr />
											<a href="pages/admin/manage-meal.html"><i className="material-icons">settings</i> Profile</a>
											<a href="pages/admin/manage-menu.html"><i className="material-icons">developer_board</i> Change Password</a>
											<hr />
											<a onClick={this.signOut}><i className="material-icons">power_settings_new</i> Sign Out</a>
										</div>
									</div>
								</div>
							</li>
						</ul> :
						<ul>
							<li><Link to="/auth"><button className="auth-button">Sign Up</button></Link></li>
							<li><Link to="/auth"><button className="auth-button" style={{ border: 'solid white 2px' }}>Login</button></Link></li>
						</ul>
					}
				</div>

				<div className="menuIcon">
					<ul>
						<li>
							<button onClick={this.toggleShow}>
								<i style={{ fontSize: 30 }} className="material-icons">menu</i>
							</button>
						</li>
					</ul>
				</div>
				<div>
					{ empty(user) ?
						<ul className={`responsive ${this.state.show}`}>
							<li><Link className="main" to="/auth">Sign In</Link></li>
							<li><Link className="main" to="/auth">Sign Up</Link></li>
						</ul>
						:
						<ul className={`responsive ${this.state.show}`}>
							<li className={page === 'menus' ? 'active' : ''}><Link className="main" to="/menus">Menu</Link></li>
							<li><Link to="/orders" className="main">Orders</Link></li>
							{this.state.show === 'showAdmin' ?
							<div>
								<hr />
								<li><Link className="main" to="/caterer/business_profile"><i className="material-icons">dashboard</i> Setup Profile</Link></li>
								<li><Link className="main" to="/caterer/meals"><i className="material-icons">donut_small</i> Manage Meals</Link></li>
								<li><Link className="main" to="/caterer/menus"><i className="material-icons">menu</i> Manage Menus</Link></li>
							</div> :
							''}
							<hr />
							<a className="main" onClick={this.signOut}><i className="material-icons">power_settings_new</i> Sign Out</a>
						</ul>
					}
				</div>
			</header>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default NavBar;
