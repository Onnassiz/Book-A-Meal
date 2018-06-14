import React from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import { getCurrentDate } from '../../../utilities/functions';

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Card = (props) => {
	const todayDate = getCurrentDate();
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
					{ todayDate > props.currentDate ? '' : <a className="add_button" href="#">Add to cart</a>}
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
	currentDate: PropTypes.string.isRequired,
};

export default Card;
