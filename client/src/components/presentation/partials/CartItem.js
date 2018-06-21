import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../../../utilities/functions';


const CartItem = (props) => {
  return (
		<div className="menu_item" key={props.meal.id}>
			<h3>{ props.meal.name }</h3>
			<div>
				<p><b>Description:</b> {props.meal.description}</p>
				<p><b>Caterer: </b>{ props.meal.caterer }</p>
				<p><b>Category: </b>{ props.meal.category }</p>
				<p><b>Unit Price: </b>&#8358;{ numberWithCommas(props.meal.price) }</p>
				<p><b>Total Price: </b>&#8358;{ numberWithCommas(props.meal.totalPrice) }</p>
				<p><b>Units: </b><input type="number" min="1" value={props.meal.units} onChange={props.updateUnits} /></p>
				<p><button onClick={props.deleteFromCart}>Remove</button></p>
			</div>
			<hr />
		</div>
  );
};

CartItem.propTypes = {
  meal: PropTypes.object.isRequired,
  updateUnits: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};

export default CartItem;
