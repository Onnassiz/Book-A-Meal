import React, { Component } from 'react';
import MenusContainer from '../container/MenusContainer';
import NavBarContainer from '../container/NavBarContainer';

class Menus extends Component {
	render() {
		return (
			<div>
				<NavBarContainer page="menus" />
				<MenusContainer />
			</div>
		);
	}
}

export default Menus;
