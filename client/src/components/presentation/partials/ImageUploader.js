import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import loaderImage from '../../../../assets/images/file-loader.gif';


class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      errors: {},
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggleLoader() {
    this.setState({ showLoader: !this.state.showLoader });
  }

  handleDrop(files) {
    const { putImage } = this.props;
    const url = 'https://api.cloudinary.com/v1_1/onnassiz/image/upload';
    const uploader = () => {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('tags', 'book-a-meal');
      formData.append('upload_preset', 'nbo5oyfm');
      formData.append('api_key', '258613626473737');
      formData.append('timestamp', (Date.now() / 1000));

      delete axios.defaults.headers.common.Authorization;
      this.toggleLoader();
      axios.post(url, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then((response) => {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const { data } = response;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        this.toggleLoader();
        putImage(fileURL);
      }).catch((error) => {
        this.showErrors(error.response);
      });
    };
    uploader();
  }

  showErrors(errors) {
    this.setState({ errors });
  }

  render() {
    const dropZoneStyle = {
      width: 350,
      height: 300,
      margin: 'auto',
      padding: 20,
      border: 'solid #7a604a 1px',
      borderRadius: 3,
    };

    return (
			<div className="col-12">
				<div className="show-errors">
					<ul>
						{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
					</ul>
				</div>
				<Dropzone
					onDrop={this.handleDrop}
					accept="image/*"
          style={dropZoneStyle}
          className="dropzone"
				>
					<div style={{ textAlign: 'center' }}>
						<h2 id="dropzoneHeader">Drop Images Here</h2>
						<br /><br /><br />
						<button disabled={this.state.showLoader} className="button">Upload Image</button>
						<div>
							<img src={loaderImage} alt="loader" hidden={!this.state.showLoader} />
						</div>
					</div>
				</Dropzone>
			</div>
    );
  }
}

ImageUploader.propTypes = {
  putImage: PropTypes.func.isRequired,
};

export default ImageUploader;
