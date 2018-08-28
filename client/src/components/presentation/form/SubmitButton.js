import React from 'react';
import PropTypes from 'prop-types';

const loaderImage = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468238/loader_awatao.gif';

const SubmitButton = props => (
  <div id="submit">
    <input type="submit" value={props.value} disabled={props.isLoading} />
    <img src={loaderImage} alt="loader" hidden={!props.isLoading} />
  </div>
);

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SubmitButton;
