import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import UserHomePage from '../pages/UserHomePage';
import Footer from '../presentation/layout/Footer';


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
			const { setUser } = this.props;
			const name = localStorage.getItem('name');
			const email = localStorage.getItem('email');
			const role = localStorage.getItem('role');
			const user = { name, email, role };

			setUser(user);
			this.setSignedIn();
		}
	}

	setSignedIn() {
		this.setState({ isSignedIn: true });
	}

	render() {
		const guestRoutes = (
			<div>
				<Route exact path="/" component={Home} />
			</div>
		);
		const userRoutes = (
			<div>
				<Route path="/" component={UserHomePage} />
			</div>
		);

		return (
			<div id="container">
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
