import React from 'react';
import PropTypes from 'prop-types';
import loaderImage from '../../../../assets/images/loader.gif';

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
