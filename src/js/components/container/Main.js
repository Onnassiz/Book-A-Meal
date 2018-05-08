import React, { Component } from 'react';
import Input from '../presentational/Input';

class Main extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	render() {
		return (
			<div>
				<h2>This is the main Component</h2>
			</div>
		);
	}
}

export default Main;
