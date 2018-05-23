import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = props => (
	<div id="submit">
		<input type="submit" value={props.value} disabled={props.isLoading} />
		<img src="../../../../assets/images/loader.gif" alt="loader" hidden={!props.isLoading} />
	</div>
);

SubmitButton.propTypes = {
	value: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default SubmitButton;
