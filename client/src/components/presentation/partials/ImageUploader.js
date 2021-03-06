import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import { addProfileImageModalView } from './../../../utilities/modalStyles';

const loaderImage = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468238/file-loader_msna34.gif';

const dropZoneStyle = {
  width: 350,
  height: 300,
  margin: 'auto',
  marginTop: 70,
  padding: 20,
  border: 'solid #7a604a 1px',
  borderRadius: 3,
};
class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      progress: 0,
      errors: {},
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggleLoader() {
    this.setState({ showLoader: !this.state.showLoader, progress: 0 });
  }

  showProgress(progress) {
    const ratio = (progress.loaded / progress.total) * 100;
    this.setState({ progress: ratio.toFixed(0) });
  }

  handleDrop(files) {
    const { putImage } = this.props;
    const url = 'https://api.cloudinary.com/v1_1/onnassiz/image/upload';
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('tags', 'book-a-meal');
    formData.append('upload_preset', 'nbo5oyfm');
    formData.append('api_key', '258613626473737');
    formData.append('timestamp', (Date.now() / 1000));

    delete axios.defaults.headers.common.Authorization;
    this.toggleLoader();

    return axios.post(url, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }, onUploadProgress: (progressEvent) => { this.showProgress(progressEvent); },
    }).then((response) => {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const { data } = response;
      const fileURL = data.secure_url;
      this.toggleLoader();
      putImage(fileURL);
      return response;
    }).catch((error) => {
      this.toggleLoader();
      this.showErrors(error.response.data);
      return error;
    });
  }

  showErrors(errors) {
    this.setState({ errors });
  }

  renderDropZone() {
    return (
      <Dropzone
        onDrop={this.handleDrop}
        accept="image/*"
        style={dropZoneStyle}
        className="dropzone"
      >
        <div style={{ textAlign: 'center' }}>
          <h2 id="dropzoneHeader">Drop Image Here</h2>
          <br /><br /><br />
          <button id="upload_image" disabled={this.state.showLoader} className="button">Upload Image</button>
          <div>
            <img src={loaderImage} alt="loader" hidden={!this.state.showLoader} />
          </div>
          <div className="progress">
            {this.state.progress === 0 ? '' : `${this.state.progress}% Complete`}
          </div>
        </div>
      </Dropzone>
    );
  }

  renderModalBody() {
    return (
      <div className="col-12">
        <div className="col-12">
          <a onClick={this.props.toggleAddPhoto} style={{ float: 'right' }}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
        </div>
        <div className="show-errors">
          <ul>
            {Object.keys(this.state.errors).map(item =>
              <li key={item}>{this.state.errors[item]}</li>)}
          </ul>
        </div>
        {this.renderDropZone()}
      </div>
    );
  }

  render() {
    return (
      <div className="col-12">
        <Modal
          isOpen={this.props.isShowingAddPhoto}
          closeTimeoutMS={1}
          style={addProfileImageModalView}
          ariaHideApp={false}
          contentLabel="Modal"
          className="image-upload"
        >
          {this.renderModalBody()}
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  putImage: PropTypes.func.isRequired,
  isShowingAddPhoto: PropTypes.bool.isRequired,
  toggleAddPhoto: PropTypes.func.isRequired,
};

export default ImageUploader;
