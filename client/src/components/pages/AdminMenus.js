import React, { Component } from 'react';
import AdminMenusContainer from '../container/AdminMenusContainer';
import NavBarContainer from '../container/NavBarContainer';

class Profile extends Component {
	render() {
		return (
			<div>
				<NavBarContainer page="caterer" />
				<AdminMenusContainer />
			</div>
		);
	}
}

export default Profile;
