import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import empty from 'is-empty';
import { addProfileModalStyle, addProfileImageModalView } from './../../utilities/modalStyles';
import { BasicInput, TextArea } from '../presentation/form/BasicInput';
import SubmitButton from '../presentation/form/SubmitButton';
import validateProfile from '../../utilities/validateProfileForm';
import Alert from '../presentation/partials/Alert';
import ImageUploader from '../presentation/partials/ImageUploader';


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
    if (user.role !== 'caterer') {
      history.push('/');
    }
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
    const closeModalStyle = {
      marginRight: 55,
      float: 'right',
    };

    return (
			<div id="content2" style={{ paddingBottom: 200 }}>
				<div className="col-12">
					<button onClick={empty(profile.businessName) ? this.handleAddButtonClick.bind(this, false) : this.handleAddButtonClick.bind(this, true)} style={{ marginRight: 5 }} className="button">
						{empty(profile.businessName) ? 'Add Profile' : 'Update Profile'}
					</button>
					<button disabled={empty(profile.id)} onClick={this.toggleDropZone} className="button">Upload Banner</button>
				</div>
				{empty(profile.alert) ? '' : <Alert alert={profile.alert} />}
				<div>
					<Modal
						isOpen={this.state.isShowingModal}
						closeTimeoutMS={1}
						style={addProfileModalStyle}
						ariaHideApp={false}
						contentLabel="Modal"
					>
						<div className="col-12">
							<a onClick={this.handleAddButtonClick} style={closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
						</div>
						<div className="box">
							<h3>Setup Business Profile</h3>
							<div className="show-errors">
								<ul>
									{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
									{empty(profile.errors) ? '' : Object.keys(profile.errors).map(item => <li key={item}>{ profile.errors[item] }</li>)}
								</ul>
							</div>
							<form onSubmit={this.handleSubmit}>
								<BasicInput name="businessName" type="text" label="Business Name" value={this.state.businessName} onChange={this.onChange} hasError={this.state.errors.businessName !== undefined} />
								<BasicInput name="mission" type="text" label="Mission Statement" value={this.state.mission} onChange={this.onChange} hasError={this.state.errors.mission !== undefined} />
								<BasicInput name="email" type="text" label="Business Email" value={this.state.email} onChange={this.onChange} hasError={this.state.errors.email !== undefined} />
								<TextArea name="contact" type="text" label="Contact" value={this.state.contact} onChange={this.onChange} hasError={this.state.errors.contact !== undefined} />
								<SubmitButton value={empty(profile.businessName) ? 'Submit' : 'Update'} isLoading={formState.isLoading} />
							</form>
						</div>
					</Modal>
				</div>
				<div>
					<Modal
						isOpen={this.state.isShowingDropZoneModal}
						closeTimeoutMS={1}
						style={addProfileImageModalView}
						ariaHideApp={false}
						contentLabel="Modal"
					>
						<div className="col-12">
							<div className="col-12">
								<a onClick={this.toggleDropZone} style={{ float: 'right' }}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
							</div>
							<ImageUploader putImage={this.putImage} />
						</div>
					</Modal>
				</div>
				<div className="col-12">
					<div id="detail">
						<h2>Business Name</h2>
						<span>{profile.businessName}</span>
					</div>
					<div id="detail">
						<h2>Mission</h2>
						<span>{profile.mission}</span>
					</div>
					<div id="detail">
						<h2>Business Email</h2>
						<span>{profile.email}</span>
					</div>
					<div id="detail">
						<h2>Contact</h2>
						<span>{profile.contact}</span>
					</div>
					<div id="detail">
						<h2>Banner</h2>
						<span>
							{ empty(profile.banner) ? <i className="material-icons">photo</i> : <img src={profile.banner} alt="banner" style={{ maxHeight: '600px', borderRadius: 4 }} />}
						</span>
					</div>
				</div>
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
