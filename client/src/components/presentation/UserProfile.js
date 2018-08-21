import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  render() {
    return (
      <div id="content-body">
        <h1>Your Profile</h1>
        <h2>Email</h2>
        <div>{ this.state.user.email }</div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
