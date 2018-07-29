import React from 'react';
import PropTypes from 'prop-types';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

const MenuAccordion = (props) => {
  return (
		<AccordionItem>
			<AccordionItemTitle>
				<h3 className="u-position-relative">
					{ new Date(props.menu.date).toDateString() }
					<div className="accordion__arrow" role="presentation" />
				</h3>
				<div>{ props.menu.name }</div>
				<div>{ props.menu.mealsCount > 1 ? `${props.menu.mealsCount} meals` : `${props.menu.mealsCount} meal` }</div>
			</AccordionItemTitle>
			<AccordionItemBody>
				{/* { props.menu.meals.map(meal => (
					<div className="menu_item" key={meal.id}>
						<h3>{ meal.name }</h3>
						<div>
							<p><b>Description:</b> {meal.description}</p>
							<p><b>Category: </b>{ meal.category }</p>
							<p><b>Price: </b>{ meal.price }</p>
						</div>
					</div>)) }
				{!props.showOpsButtons ? '' :
					<div>
						<hr />
						<div style={{ marginLeft: 20 }}>
							<button onClick={props.toggleShowDeleteModal} className="button-error">Delete</button>
							<button onClick={props.toggleUpdateModal} className="button">Edit</button>
						</div>
					</div>} */}
					<div>
						<div style={{ textAlign: 'right' }}>
							<button style={{ width: 110 }} onClick={props.toggleShowDeleteModal} className="button-error"><i className="ion-ios-trash" /> Delete</button>
							<button style={{ width: 110 }} onClick={props.toggleUpdateModal} className="button"><i className="ion-ios-compose-outline" /> Edit</button>
						</div>
					</div>
			</AccordionItemBody>
		</AccordionItem>
  );
};

MenuAccordion.propTypes = {
  menu: PropTypes.object.isRequired,
  toggleUpdateModal: PropTypes.func.isRequired,
  toggleShowDeleteModal: PropTypes.func.isRequired,
  showOpsButtons: PropTypes.bool.isRequired,
};

export default MenuAccordion;
