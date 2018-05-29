import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Footer from '../presentation/layout/Footer';
import UserHomePage from '../pages/UserHomePage';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Meals from '../pages/Meals';


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

	setSignedIn() {
		this.setState({ isSignedIn: true });
	}

	render() {
		const guestRoutes = (
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		);
		const userRoutes = (
			<Switch>
				<Route exact path="/" component={UserHomePage} />
				<Route exact path="/caterer/business_profile" component={Profile} />
				<Route exact path="/caterer/meals" component={Meals} />
			</Switch>
		);
		return (
			<div>
				<main>
					{ this.state.isSignedIn ? userRoutes : guestRoutes }
				</main>
				<Footer />
			</div>
		);
	}
}

App.propTypes = {
	setUser: PropTypes.func.isRequired,
};

export default App;
