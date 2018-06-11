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

export const Checkbox = props => (
	<label className="checkbox"> {props.meal.name} <span style={{ float: 'right', color: '#7a604a', fontSize: 10 }}>Added by {props.meal.caterer}</span>
		<input type="checkbox" value={props.meal.id} onChange={props.onChange} checked={props.isChecked} /><span className="check" />
	</label>
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

Checkbox.propTypes = {
	meal: PropTypes.object.isRequired,
	isChecked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
	hasError: false,
};

