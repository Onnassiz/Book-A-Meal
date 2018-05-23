import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
	}

	signOut() {
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('role');
		localStorage.removeItem('token');

		setTimeout(() => {
			window.location = '/';
		}, 500);
	}
	render() {
		const { user } = this.props;
		const initials = user.name.match(/\b(\w)/g).join('').toUpperCase();
		return (
			<header>
				<h1 className="logo"><Link to="/"><img src="../assets/images/logo.png" alt="logo" /></Link></h1>
				<div className="nav">
					<ul>
						<li><a href="pages/menu.html">Menu</a></li>
						<li><a href="#">Orders</a></li>
						<li><a href="#"><i className="material-icons">shopping_cart</i></a></li>
						<li>
							<div className="dropdown">
								<a href="#">{user.email}<i id="caret" className="material-icons">arrow_drop_down</i></a>
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
						</li>
					</ul>
				</div>
			</header>
		);
	}
}

NavBar.propTypes = {
	user: PropTypes.object.isRequired,
};

export default NavBar;