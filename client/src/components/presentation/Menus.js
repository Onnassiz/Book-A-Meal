import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import { convertUnixToDateForUpdate } from '../../utilities/functions';
import Card from './partials/MealCard';

class Menus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.menus.currentDate,
		};
		this.onChange = this.onChange.bind(this);
		this.getMenuForDate = this.getMenuForDate.bind(this);
	}

	componentWillMount() {
		const { getMenusByUnixTime } = this.props;
		getMenusByUnixTime(this.state.date);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	getMenuForDate(number) {
		const { getMenusByUnixTime } = this.props;
		let date = new Date(this.state.date);
		date = convertUnixToDateForUpdate(date.setDate(date.getDate() + number) / 1000);
		getMenusByUnixTime(date).then(() => {
			this.setState({ date });
		}).catch(() => {
			this.setState({ date });
		});
	}

	render() {
		const { menus } = this.props;
		return (
			<div id="content2">
				<div className="col-12">
					<div className="dateInput">
						<a onClick={() => this.getMenuForDate(-1)} title="back"><i className="material-icons">navigate_before</i></a>
						<input autoComplete="off" type="date" name="date" onChange={this.onChange} value={this.state.date} required="" id="date" />
						<a onClick={() => this.getMenuForDate(1)} title="next day"><i className="material-icons">navigate_next</i></a>
					</div>
					<div id="card_container">
						{empty(menus.userMenus) ?
							<div id="no-menu">
								<h2>No menu has been set for this day.</h2>
							</div> : menus.userMenus.map(meal => <Card meal={meal} key={meal.id + meal.caterer} />)}
					</div>
				</div>
			</div>
		);
	}
}

Menus.propTypes = {
	menus: PropTypes.object.isRequired,
	getMenusByUnixTime: PropTypes.func.isRequired,
};
export default Menus;

