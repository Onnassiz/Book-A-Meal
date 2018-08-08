import React from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';


const ShowErrors = props => (
  <div className="show-errors">
    <ul>
      {Object.keys(props.clientErrors).map(item =>
        <li key={item}>{props.clientErrors[item]}</li>)}
      {empty(props.serverErrors) ? '' : Object.keys(props.serverErrors).map(item =>
        <li key={item}>{props.serverErrors[item]}</li>)}
    </ul>
  </div>
);

ShowErrors.propTypes = {
  serverErrors: PropTypes.array.isRequired,
  clientErrors: PropTypes.array.isRequired,
};

export default ShowErrors;
