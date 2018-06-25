import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import Alert from '../presentation/partials/Alert';
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
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentWillMount() {
    const { getMenusByUnixTime } = this.props;
    getMenusByUnixTime(this.state.date);
  }

  onChange(e) {
    const { getMenusByUnixTime } = this.props;
    let date = new Date(e.target.value);
    date = convertUnixToDateForUpdate(date.setDate(date.getDate()) / 1000);
    getMenusByUnixTime(date).then(() => {
      this.setState({ date });
    }).catch(() => {
      this.setState({ date });
    });
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

  addToCart(meal) {
    const { addToCart } = this.props;
    addToCart(meal);
  }

  removeFromCart(mealId) {
    const { deleteFromCart } = this.props;
    deleteFromCart(mealId);
  }

  render() {
    const { menus, cart, orders } = this.props;
    return (
			<div id="content2">
				<div className="col-12">
          {empty(orders.alert) ? '' : <Alert alert={orders.alert} />}
					<div className="dateInput">
						<a onClick={() => this.getMenuForDate(-1)} title="back"><i className="material-icons">navigate_before</i></a>
						<input autoComplete="off" type="date" name="date" onChange={this.onChange} value={this.state.date} required="" id="date" />
						<a onClick={() => this.getMenuForDate(1)} title="next day"><i className="material-icons">navigate_next</i></a>
					</div>
					<div id="card_container">
						{empty(menus.userMenus) ?
							<div id="no-menu">
								<h2>No menu has been set for this day</h2>
							</div> : menus.userMenus.map(meal => <Card cart={cart.cart} addToCart={() => this.addToCart(meal)} meal={meal} key={meal.id + meal.caterer} currentDate={menus.currentDate} removeFromCart={() => this.removeFromCart(meal.id)} />)}
					</div>
				</div>
			</div>
    );
  }
}

Menus.propTypes = {
  orders: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  getMenusByUnixTime: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};
export default Menus;

