import React from 'react';
import PropTypes from 'prop-types';

import {
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';
import { convertUnixToDate } from '../../../utilities/functions';

const MenuAccordion = (props) => {
	return (
		<AccordionItem>
			<AccordionItemTitle>
				<h3 className="u-position-relative">
					{ convertUnixToDate(props.menu.unixTime) }
					<div className="accordion__arrow" role="presentation" />
				</h3>
				<div>{ props.menu.name }</div>
			</AccordionItemTitle>
			<AccordionItemBody>
				{ props.menu.meals.map(meal => (
					<div className="menu_item" key={meal.id}>
						<h3>{ meal.name }</h3>
						<div>
							<p><b>Description:</b>{meal.description}</p>
							<p><b>Category: </b>{ meal.category }</p>
							<p><b>Price: </b>{ meal.price }</p>
						</div>
					</div>)) }
				<hr />
				<div style={{ marginLeft: 20 }}>
					<button onClick={props.toggleUpdateModal} className="button-default">Edit</button>
					<button onClick={props.toggleShowDeleteModal} className="button-error">Delete</button>
				</div>
			</AccordionItemBody>
		</AccordionItem>
	);
};

MenuAccordion.propTypes = {
	menu: PropTypes.object.isRequired,
	toggleUpdateModal: PropTypes.func.isRequired,
	toggleShowDeleteModal: PropTypes.func.isRequired,
};

export default MenuAccordion;
