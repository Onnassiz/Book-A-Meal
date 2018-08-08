/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import validateProfile from '../../utilities/validateProfileForm';
import Alert from '../presentation/partials/Alert';
import ImageUploader from '../presentation/partials/ImageUploader';
import ProfileModal from './partials/Profile.js/ProfileModal';
import ProfileSection from './partials/Profile.js/ProfileSection';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      isShowingDropZoneModal: false,
      mission: '',
      email: props.user.email,
      businessName: '',
      contact: '',
      errors: {},
    };
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.toggleDropZone = this.toggleDropZone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.putImage = this.putImage.bind(this);
  }

  componentWillMount() {
    const { user, history, getProfile, profile } = this.props;
    if (user.role !== 'caterer' || !user.role) {
      history.push('/');
    }
  }

  componentDidMount() {
    const { getProfile, profile } = this.props;
    document.title = 'Profile - Just Eat';
    if (empty(profile)) {
      getProfile();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleDropZone() {
    this.setState({ isShowingDropZoneModal: !this.state.isShowingDropZoneModal });
  }

  putImage(imageURL) {
    const { putImage, profile } = this.props;
    const field = {
      banner: imageURL,
    };
    putImage(profile.id, field).then((response) => {
      if (response.status === 200) {
        this.toggleDropZone(false);
      }
    });
  }

  isValid() {
    this.setState({ errors: {} });
    const { errors, isValid } = validateProfile(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleAddButtonClick(update) {
    if (update) {
      const { profile } = this.props;
      this.setState({
        isShowingModal: !this.state.isShowingModal,
        businessName: profile.businessName,
        email: profile.email,
        mission: profile.mission,
        contact: profile.contact,
      });
    } else {
      this.setState({ isShowingModal: !this.state.isShowingModal });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { postProfile, updateProfile, profile } = this.props;

      const formData = {
        id: profile.id,
        businessName: this.state.businessName,
        email: this.state.email,
        mission: this.state.mission,
        contact: this.state.contact,
      };

      if (empty(profile.businessName)) {
        postProfile(formData).then((response) => {
          if (response.status === 201) {
            this.handleAddButtonClick(false);
          }
        });
      } else {
        updateProfile(formData).then((response) => {
          if (response.status === 200) {
            this.handleAddButtonClick(false);
          }
        });
      }
    }
  }


  render() {
    const { formState, profile } = this.props;
    return (
      <div id="content-body">
        <div className="col-12">
          <button onClick={empty(profile.businessName) ? this.handleAddButtonClick.bind(this, false) : this.handleAddButtonClick.bind(this, true)} style={{ marginRight: 5 }} className="button">
            {empty(profile.businessName) ? 'Add Profile' : 'Update Profile'}
          </button>
          <button disabled={empty(profile.id)} onClick={this.toggleDropZone} className="button">Upload Banner</button>
        </div>
        {empty(profile.alert) ? '' : <Alert alert={profile.alert} />}

        <ProfileModal
          state={this.state}
          profile={profile}
          handleSubmit={this.handleSubmit}
          handleAddButtonClick={this.handleAddButtonClick}
          formState={formState}
          onChange={this.onChange}
        />
        <div>
          <ImageUploader putImage={this.putImage} isShowingAddPhoto={this.state.isShowingDropZoneModal} toggleAddPhoto={this.toggleAddPhoto} />
        </div>
        <ProfileSection profile={profile} />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  postProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  putImage: PropTypes.func.isRequired,
};

export default Profile;
