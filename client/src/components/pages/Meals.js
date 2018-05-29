import React, { Component } from 'react';
import MealsContainer from '../container/MealsContainer';
import NavBarContainer from '../container/NavBarContainer';

class Profile extends Component {
	render() {
		return (
			<div>
				<NavBarContainer page="caterer" />
				<MealsContainer />
			</div>
		);
	}
}

export default Profile;
