import React, { Component } from 'react';
import AdminMenusContainer from '../container/AdminMenusContainer';
import NavBarContainer from '../container/NavBarContainer';

class AdminMenus extends Component {
	render() {
		return (
			<div>
				<NavBarContainer page="caterer" />
				<AdminMenusContainer />
			</div>
		);
	}
}

export default AdminMenus;
