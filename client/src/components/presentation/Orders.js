/* eslint react/no-did-update-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Accordion } from 'react-accessible-accordion';
import OrderAccordion from './partials/OrderAccordion';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      ordersCount: 0,
      activePage: 1,
    };
    this.updateOrdersState = this.updateOrdersState.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Orders - Just Eat';
    this.getUserOrders(6, 0);
  }

  getUserOrders(limit, offset, pageNumber = 1) {
    const { getUserOrders } = this.props;
    getUserOrders(limit, offset).then((response) => {
      if (response.status === 200) {
        this.setState({
          orders: response.data.orders,
          ordersCount: response.data.count,
          activePage: pageNumber,
        });
      }
    });
  }

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * 6;
    this.getUserOrders(6, offset, pageNumber);
  }

  updateOrdersState(order) {
    const stateOrders = this.state.orders;
    const index = stateOrders.findIndex(x => x.id === order.id);
    stateOrders[index] = order;
    this.setState({ orders: stateOrders });
  }

  renderOrderAccordion() {
    return (
      <div>
        { this.state.orders.length > 0 ?
          <Accordion>
            {this.state.orders.map(order =>
          (<OrderAccordion
            key={order.id}
            setUpdatedOrder={this.props.setUpdatedOrder}
            updateOrdersState={this.updateOrdersState}
            order={order}
            orders={this.props.orders}
            addArrayToCart={this.props.addArrayToCart}
            user={this.props.user}
            getMealsInOrder={this.props.getMealsInOrder}
          />))}
          </Accordion> :
          <div id="no-menu">
            <h2>You order history is empty</h2>
          </div> }
      </div>
    );
  }

  renderPagination() {
    return (
      <div>{this.state.ordersCount > 4 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={6}
            totalItemsCount={this.state.ordersCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : ''}
      </div>
    );
  }

  render() {
    return (
      <div id="content-body">
        <h1>Your Orders</h1>
        { this.renderPagination() }
        { this.renderOrderAccordion() }
        { this.renderPagination() }
      </div>
    );
  }
}

Orders.propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  getMealsInOrder: PropTypes.func.isRequired,
  addArrayToCart: PropTypes.func.isRequired,
  setUpdatedOrder: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
};

export default Orders;
