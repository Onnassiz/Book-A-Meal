import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

class MenuAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {},
      showMeals: false,
      activePage: 1,
      thisPageMeals: [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.showMeals = this.showMeals.bind(this);
  }

  componentWillMount() {
    const { menu } = this.props;
    this.setState({ menu, thisPageMeals: menu.mealsArray });
  }

  handlePageChange(pageNumber) {
    const { getMealsInMenu } = this.props;
    const offset = (pageNumber - 1) * 5;

    getMealsInMenu(this.state.menu, offset).then((response) => {
      if (response.response.status === 200) {
        this.setState({
          activePage: pageNumber,
          thisPageMeals: response.response.data,
        });
      }
    });
  }

  showMeals() {
    const { getMealsInMenu } = this.props;
    getMealsInMenu(this.state.menu, 0).then((response) => {
      if (response.response.status === 200) {
        this.setState({
          activePage: 1,
          thisPageMeals: response.response.data,
          showMeals: true,
        });
      }
    });
  }

  renderAccordionTitle() {
    return (
      <AccordionItemTitle>
        <h3 className="u-position-relative">
          {new Date(this.state.menu.date).toDateString()}
          <div className="accordion__arrow" role="presentation" />
        </h3>
        <div style={{ fontSize: 13, marginTop: 5 }}>{this.state.menu.mealsCount}{this.state.menu.mealsCount > 1 ? ' meals' : ' meal'}</div>
      </AccordionItemTitle>
    );
  }

  renderPagination() {
    return (
      <div>{this.state.menu.mealsCount > 5 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.menu.mealsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          <hr />
        </div> : ''}
      </div>
    );
  }

  renderMeals() {
    return (
      <div>
        { this.state.thisPageMeals.length > 0 ? this.state.thisPageMeals.map(meal => (
          <div className="menu_item" key={meal.id}>
            <h3>{ meal.name }</h3>
            <div>
              <p><b>Description:</b> {meal.description}</p>
              <p><b>Category: </b>{ meal.category }</p>
              <p><b>Price: </b>{ meal.price }</p>
            </div>
          </div>)) : ''}
        { this.renderPagination() }
      </div>
    );
  }

  render() {
    return (
      <AccordionItem>
        {this.renderAccordionTitle()}
        <AccordionItemBody>
          {this.state.showMeals ?
            this.renderMeals() :
            <div className="show-meals">
              <button className="button" onClick={this.showMeals}><i className="ion-ios-eye" /> Show Meals</button>
            </div>}
          {!this.props.showOpsButtons ? '' :
          <div>
            <div style={{ textAlign: 'center' }}>
              <button style={{ width: 110 }} onClick={this.props.toggleShowDeleteModal} className="button-error"><i className="ion-ios-trash" /> Delete</button>
              <button style={{ width: 110 }} onClick={this.props.toggleUpdateModal} className="button"><i className="ion-ios-compose-outline" /> Edit</button>
            </div>
          </div>}
        </AccordionItemBody>
      </AccordionItem>
    );
  }
}


MenuAccordion.propTypes = {
  menu: PropTypes.object.isRequired,
  toggleUpdateModal: PropTypes.func.isRequired,
  toggleShowDeleteModal: PropTypes.func.isRequired,
  showOpsButtons: PropTypes.bool.isRequired,
  getMealsInMenu: PropTypes.func.isRequired,
};

export default MenuAccordion;
