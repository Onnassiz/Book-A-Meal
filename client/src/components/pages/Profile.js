import React, { Component } from 'react';
import ProfileContainer from '../container/ProfileContainer';
import NavBarContainer from '../container/NavBarContainer';

class Profile extends Component {
	render() {
		return (
			<div>
				<NavBarContainer page="caterer" />
				<ProfileContainer />
			</div>
		);
	}
}

export default Profile;
