import React from 'react';
import PropTypes from 'prop-types';

export const BasicInput = props => (
	<div className="inputBox">
		<label htmlFor={props.name}>{props.label}</label>
		<input autoComplete={props.name} className={props.hasError ? 'has-error' : ''} onChange={props.onChange} value={props.value} type={props.type} name={props.name} id={props.name} />
	</div>
);

export const TextArea = props => (
	<div className="inputBox">
		<label htmlFor={props.name}>{props.label}</label>
		<textarea className={props.hasError ? 'has-error' : ''} name={props.name} id={props.name} cols="30" rows="6" onChange={props.onChange} value={props.value} />
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

TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	hasError: PropTypes.bool,
};

TextArea.defaultProps = {
	hasError: false,
};

