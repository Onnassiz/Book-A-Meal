import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { getDateTime } from '../../../utilities/functions';

class OrderAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisPageMeals: [],
      activePage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.putBackToCart = this.putBackToCart.bind(this);
  }

  componentDidMount() {
    const { order, getMealsInOrder } = this.props;
    getMealsInOrder(order.id, 4).then((response) => {
      if (response.status === 200) {
        this.setState({ thisPageMeals: response.data });
      }
    });
  }

  componentDidUpdate() {
    const {
      orders, setUpdatedOrder, order, updateOrdersState, getMealsInOrder,
    } = this.props;
    if (orders.updatedOrder.id === order.id) {
      setUpdatedOrder({});
      getMealsInOrder(order.id, 4).then((response) => {
        if (response.status === 200) {
          updateOrdersState(orders.updatedOrder);
          this.setState({ thisPageMeals: response.data });
        }
      });
    }
  }

  putBackToCart() {
    const {
      order, getMealsInOrder, addArrayToCart, user,
    } = this.props;
    getMealsInOrder(order.id, 0, 0, true).then((response) => {
      if (response.status === 200) {
        addArrayToCart(response.data, user.id, order);
        toast('Modify your order from the cart');
      }
    });
  }

  showOpsButtons() {
    const now = new Date();
    const createdAt = new Date(this.props.order.createdAt);
    const diff = now.getTime() - createdAt.getTime();
    const diffInMinutes = (diff / 1000 / 60);
    return (
      <div>
        {diffInMinutes > 60 ? '' :
        <div style={{ textAlign: 'center' }}>
          <hr />
          <button
            style={{ width: 180 }}
            className="button"
            onClick={this.putBackToCart}
          >
            <i className="ion-ios-compose-outline" /> Modify order
          </button>
        </div>}
      </div>
    );
  }

  handlePageChange(pageNumber) {
    const { getMealsInOrder } = this.props;
    const offset = (pageNumber - 1) * 4;

    getMealsInOrder(this.props.order.id, 4, offset).then((response) => {
      if (response.status === 200) {
        this.setState({
          activePage: pageNumber,
          thisPageMeals: response.data,
        });
      }
    });
  }

  showMore(meal) {
    const details = document.createElement('div');
    details.className = 'meal-details';
    const image = meal.imageUrl ? `<div class="swal-image"><img src="${meal.imageUrl}" alt="Image"/></div>` : '';
    details.innerHTML = `${image}<h2>Description</h2><p>${meal.description}</p>`;
    swal({
      title: 'Details',
      content: details,
    });
  }

  renderAccordionTitle() {
    return (
      <AccordionItemTitle>
        <h3 className="u-position-relative">
          {getDateTime(this.props.order.createdAt)}
          <div className="accordion__arrow" role="presentation" />
        </h3>
        <div style={{ fontSize: 13, marginTop: 5 }}>{this.props.order.mealsCount}{this.props.order.mealsCount > 1 ? ' meals' : ' meal'}</div>
      </AccordionItemTitle>
    );
  }

  renderPagination() {
    return (
      <div>{this.props.order.mealsCount > 4 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.props.order.mealsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : ''}
      </div>
    );
  }

  renderMeals() {
    return (
      <div>
        {this.state.thisPageMeals.length > 0 ? this.state.thisPageMeals.map(meal => (
          <div className="menu_item" key={meal.id}>
            <h3>{meal.name}</h3>
            <div>
              <p><b>Catering Service: </b>{meal.caterer}</p>
              <p><b>Units: </b>{meal.units}</p>
              <p><b>Price: </b>&#8358;{meal.totalPrice}</p>
              <p><b>Current Unit Price: </b>&#8358;{meal.price}</p>
              <p><b>Category: </b>{meal.category}</p>
              <p><button className="more-info" onClick={() => this.showMore(meal)}>More Info</button></p>
            </div>
          </div>)) : ''}
        {this.renderPagination()}
      </div>
    );
  }

  renderAccordionBody() {
    return (
      <div className="order-content">
        <h2>Summary</h2>
        <div className="summary">
          <p><b>Net Price:</b> &#8358;{this.props.order.totalPrice}</p>
          <p><b>Contact:</b> {this.props.order.contact}</p>
          <p><b>Address:</b> {this.props.order.address}</p>
        </div>
        <h2>Meals</h2>
        {this.renderMeals()}
      </div>
    );
  }

  render() {
    return (
      <AccordionItem>
        {this.renderAccordionTitle()}
        <AccordionItemBody>
          {this.renderAccordionBody()}
          {this.showOpsButtons()}
        </AccordionItemBody>
      </AccordionItem>
    );
  }
}


OrderAccordion.propTypes = {
  order: PropTypes.object.isRequired,
  addArrayToCart: PropTypes.func.isRequired,
  getMealsInOrder: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  setUpdatedOrder: PropTypes.func.isRequired,
  updateOrdersState: PropTypes.func.isRequired,
};

export default OrderAccordion;
