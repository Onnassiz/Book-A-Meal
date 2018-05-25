import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<div className="footer">
			<div className="col-6">
      ©2018 - Just Eat
			</div>
			<div className="col-6">
				<Link to="/contact-us">Contact us</Link>
			</div>
		</div>
	);
};
