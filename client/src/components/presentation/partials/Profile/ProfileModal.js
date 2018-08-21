import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import empty from 'is-empty';
import { addProfileModalStyle } from './../../../../utilities/modalStyles';
import { BasicInput, TextArea } from '../../../presentation/form/BasicInput';
import ShowErrors from './../../partials/ShowErrors';
import SubmitButton from '../../../presentation/form/SubmitButton';

const closeModalStyle = {
  float: 'right',
};

const renderInputFields = data => (
  <div>
    <BasicInput
      name="businessName"
      type="text"
      label="Business Name"
      value={data.state.businessName}
      onChange={data.onChange}
      hasError={data.state.errors.businessName !== undefined}
    />
    <BasicInput
      name="mission"
      type="text"
      label="Mission Statement"
      value={data.state.mission}
      onChange={data.onChange}
      hasError={data.state.errors.mission !== undefined}
    />
    <BasicInput
      name="email"
      type="text"
      label="Business Email"
      value={data.state.email}
      onChange={data.onChange}
      hasError={data.state.errors.email !== undefined}
    />
  </div>
);

const renderModalBody = props => (
  <div>
    <div className="col-12">
      <a onClick={props.handleAddButtonClick} style={closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
    </div>
    <div className="box">
      <h3>Setup Business Profile</h3>
      <ShowErrors clientErrors={props.state.errors} serverErrors={props.profile.errors || {}} />
      <form onSubmit={props.handleSubmit}>
        {renderInputFields(props)}
        <TextArea
          name="contact"
          type="text"
          label="Contact"
          value={props.state.contact}
          onChange={props.onChange}
          hasError={props.state.errors.contact !== undefined}
        />
        <SubmitButton value={empty(props.profile.businessName) ? 'Submit' : 'Update'} isLoading={props.formState.isLoading} />
      </form>
    </div>
  </div>
);

const ProfileModal = props => (
  <div>
    <Modal
      isOpen={props.state.isShowingModal}
      closeTimeoutMS={1}
      style={addProfileModalStyle}
      ariaHideApp={false}
      contentLabel="Modal"
      className="create-profile"
    >
      {renderModalBody(props)}
    </Modal>
  </div>
);

ProfileModal.propTypes = {
  state: PropTypes.object.isRequired,
};

renderModalBody.propTypes = {
  state: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formState: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
};

export default ProfileModal;
