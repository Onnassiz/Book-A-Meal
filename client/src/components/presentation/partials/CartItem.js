import React from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import { numberWithCommas } from '../../../utilities/functions';


const CartItem = (props) => {
  let image = props.meal.imageUrl;
  image = image === null ? null : image.replace('upload/', 'upload/c_scale,w_100/');
  return (
		<div className="cart-item" key={props.meal.id}>
			<p><span className="name">{props.meal.name}</span></p>
			<div className="image">
				{empty(props.meal.imageUrl) ? <div /> : <img src={image} alt={props.meal.name} />}
			</div>
			<div className="details">
				<p>Price: &#8358;{numberWithCommas(props.meal.price)}</p>
				<p>Total Price: &#8358;{numberWithCommas(props.meal.totalPrice)}</p>
				<p>Quantity: <input type="number" min="1" value={props.meal.units} onChange={props.updateUnits} /></p>
				<p><button onClick={props.deleteFromCart}><i className="ion-trash-b" /> Remove</button></p>
			</div>
			<div style={{ clear: 'both', paddingTop: 1, width: 250 }}>
				<hr />
			</div>
		</div>
  );
};

CartItem.propTypes = {
  meal: PropTypes.object.isRequired,
  updateUnits: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};

export default CartItem;
