import React from 'react';
import PropTypes from 'prop-types';

const BasicInput = props => (
	<div className="inputBox">
		<label htmlFor={props.name}>{props.label}</label>
		<input autoComplete={props.name} className={props.hasError ? 'has-error' : ''} onChange={props.onChange} value={props.value} type={props.type} name={props.name} id={props.name} />
	</div>
);

BasicInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	hasError: PropTypes.bool,
};

BasicInput.defaultProps = {
	hasError: false,
};

export default BasicInput;
