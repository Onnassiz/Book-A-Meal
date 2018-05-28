import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlert: true,
		};
	}

	componentWillMount() {
		const $this = this;
		setTimeout(() => {
			$this.toggleShowAlert();
		}, 5000);
	}

	toggleShowAlert() {
		this.setState({ showAlert: !this.state.showAlert });
	}

	render() {
		const { alert } = this.props;
		return (
			<div>
				{!this.state.showAlert ? '' :
					<div className="col-12">
						<div id="alert">{alert}</div>
					</div>}
			</div>
		);
	}
}

Alert.propTypes = {
	alert: PropTypes.string,
};

Alert.defaultProps = {
	alert: '',
};

export default Alert;
