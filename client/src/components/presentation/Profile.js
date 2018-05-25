import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

class Profile extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const { user } = this.props;
		if (user.role !== 'caterer') {
			push('/');
		}
	}

	render() {
		return (
			<div id="content2">
        You have seen the profile
			</div>
		);
	}
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
};

export default Profile;
