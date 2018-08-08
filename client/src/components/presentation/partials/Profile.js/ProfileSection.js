import React from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';

const ProfileSection = props => (
  <div className="col-12" >
    <div id="detail">
      <h2>Business Name</h2><span>{props.profile.businessName}</span>
    </div>
    <div id="detail">
      <h2>Mission</h2>
      <span>{props.profile.mission}</span>
    </div>
    <div id="detail">
      <h2>Business Email</h2>
      <span>{props.profile.email}</span>
    </div>
    <div id="detail">
      <h2>Contact</h2>
      <span>{props.profile.contact}</span>
    </div>
    <div id="detail">
      <h2>Banner</h2>
      <span>
        {empty(props.profile.banner) ? <i className="material-icons">photo</i> :
        <img src={props.profile.banner} alt="banner" style={{ maxHeight: '600px', borderRadius: 4 }} />}
      </span>
    </div>
  </div>
);


ProfileSection.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileSection;

