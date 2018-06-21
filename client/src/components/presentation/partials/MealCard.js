import React from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import { getCurrentDate } from '../../../utilities/functions';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isAdded = (cart, id) => {
  const items = cart.filter(x => x.id === id);
  return items.length > 0;
};

const Card = (props) => {
  const todayDate = getCurrentDate();
  const { cart } = props;
  const button = (
		<span>
			{ isAdded(cart, props.meal.id) ? <a className="add_button" onClick={props.removeFromCart}>Remove from cart</a> : <a className="add_button" onClick={props.addToCart}>Add to cart</a> }
		</span>
  );
  return (
		<div className="card">
			<div className="card-header">
				{ empty(props.meal.imageUrl) ? '' : <img src={props.meal.imageUrl} alt="food" />}
				<div className="cover" />
				<div className="menu">
					<ul>
						<li className="ion-social-twitter" />
						<li className="ion-social-facebook" />
					</ul>
					<span style={{ fontSize: 28 }} className="ion-android-more-vertical" />
				</div>
				<div className="name">
					<span className="last">{props.meal.name}</span>
					<span>{empty(props.meal.menuName) ? '' : props.meal.menuName}</span>
				</div>
			</div>
			<div className="card_container">
				<div className="left">
					<h3>Description</h3>
					<p>{props.meal.description}</p>
					{ todayDate > props.currentDate ? '' : button}
				</div>
				<div className="right">
					<div className="item">
						<p className="num">&#8358;{numberWithCommas(props.meal.price)}</p><p className="word">{props.meal.category}</p>
					</div>
					<br />
					<div className="item">
						<p className="word"><a>{props.meal.caterer}</a></p>
					</div>
				</div>
			</div>
		</div>
  );
};

Card.propTypes = {
  meal: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  currentDate: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Card;
