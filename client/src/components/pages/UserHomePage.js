import React, { Component } from 'react';
import UserHomePageContainer from '../container/UserHomePageContainer';
import NavBarContainer from '../container/NavBarContainer';

class UserHomePage extends Component {
	render() {
		return (
			<div>
				<NavBarContainer />
				<UserHomePageContainer />
			</div>
		);
	}
}

export default UserHomePage;
