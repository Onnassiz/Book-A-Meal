/* eslint react/no-unused-state: 0 */
import React, { Component } from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Accordion } from 'react-accessible-accordion';
import '../../../assets/css/fancy.css';
import MenuAccordion from './partials/MenuAccordion';
import { sortMenu } from '../../utilities/functions';
import MenuModal from './partials/AdminMenu/MenuModal';
import { toggleShowDeleteModal, handlePageChange, showOpsButtons } from '../../utilities/adminMenusHelper';

class AdminMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuCount: 0,
      thisPageMenus: [],
      activePage: 1,
      meals: [],
      mealsCount: 0,
      updateMenu: false,
      mealsActivePage: 1,
      selectedMeals: [],
      currentMenu: {},
      isShowingModal: false,
      isShowingDeleteMeal: false,
    };
    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.pushToProfile = this.pushToProfile.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addToViewMenus = this.addToViewMenus.bind(this);
    this.updateViewMenus = this.updateViewMenus.bind(this);
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.role !== 'caterer' || !user.role) {
      history.push('/');
    }
  }

  componentDidMount() {
    const { getProfile, profile, getUserMenus } = this.props;

    document.title = 'Admin Menus - Just Eat';

    if (empty(profile)) {
      getProfile();
    }

    getUserMenus().then((response) => {
      if (response.status === 200) {
        this.setState({ thisPageMenus: response.data.menus, menuCount: response.data.count });
      }
    });
  }

  pushToProfile() {
    const { history } = this.props;
    history.push('/caterer/business_profile');
  }

  toggleShowModal() {
    const { getMeals } = this.props;
    if (this.state.isShowingModal) {
      this.setState({
        isShowingModal: !this.state.isShowingModal,
        updateMode: false,
        mealsActivePage: 1,
      });
    } else {
      return getMeals(9, 0).then((response) => {
        if (response.status === 200) {
          this.setState({
            meals: response.data.meals,
            mealsCount: response.data.count,
            isShowingModal: !this.state.isShowingModal,
          });
          return response;
        }
      });
    }
  }

  handlePageChange(number) {
    return handlePageChange(number, true, this);
  }

  handMenuPageChange(number) {
    return handlePageChange(number, false, this);
  }

  toggleShowDeleteModal(menu) {
    toggleShowDeleteModal(menu, this);
  }


  toggleUpdateModal(menu) {
    const { getMeals, getMealsInMenu } = this.props;
    const selectedMeals = [];

    return getMealsInMenu(menu, 0, true).then((res) => {
      if (res.response.status === 200) {
        res.response.data.map(item => selectedMeals.push({
          mealId: item.id,
          price: item.price,
        }));

        return getMeals(9, 0).then((response) => {
          if (response.status === 200) {
            this.setState({
              meals: response.data.meals,
              mealsCount: response.data.count,
              isShowingModal: true,
              selectedMeals,
              updateMode: true,
              currentMenu: menu,
            });
            return response;
          }
        });
      }
    });
  }

  addToViewMenus(newMenus) {
    const menus = newMenus.concat(this.state.thisPageMenus).splice(0, 10).sort(sortMenu);
    this.toggleShowModal();
    this.setState({ menuCount: this.state.menuCount + newMenus.length, thisPageMenus: menus });
  }

  updateViewMenus(menu) {
    const { thisPageMenus } = this.state;
    const index = thisPageMenus.findIndex(x => x.id === menu.id);
    thisPageMenus[index] = menu;
    this.setState({ thisPageMenus: [] });
    const $this = this;
    setTimeout(() => {
      $this.setState({ thisPageMenus });
      $this.toggleShowModal();
    }, 300);
  }

  renderPagination() {
    return (
      <div>{this.state.menuCount > 10 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            itemsCountPerPage={10}
            totalItemsCount={this.state.menuCount}
            pageRangeDisplayed={5}
            hideDisabled
            activePage={this.state.activePage}
            onChange={number => this.handMenuPageChange(number)}
          />
        </div> : ''}
      </div>
    );
  }

  renderSetupProfile() {
    return (
      <div className="col-12" style={{ textAlign: 'center' }}>
        <h2>
          You have not created a Business Profile.
          You need a business profile before managing menus.
          Create a business profile first by clicking the link below.
        </h2>
        <button id="setupProfile" className="button" onClick={this.pushToProfile}>Setup Profile</button>
      </div>
    );
  }

  renderAddButton() {
    return (
      <div className="col-12">
        <button id="showModal" onClick={this.toggleShowModal} className="button"><i className="ion-android-add" /> Add Menu</button>
      </div>
    );
  }

  renderModal() {
    const {
      menus, formState, postMenu, updateMenu,
    } = this.props;
    return (
      <MenuModal
        state={this.state}
        menus={menus}
        formState={formState}
        postMenu={postMenu}
        updateMenu={updateMenu}
        toggleShowModal={this.toggleShowModal}
        addToViewMenus={this.addToViewMenus}
        updateViewMenus={this.updateViewMenus}
        handlePageChange={this.handlePageChange}
      />
    );
  }

  renderAccordion() {
    return (
      <Accordion>
        {this.state.thisPageMenus.map(menu =>
          (<MenuAccordion
            showOpsButtons={showOpsButtons(menu.date)}
            getMealsInMenu={this.props.getMealsInMenu}
            toggleUpdateModal={() => this.toggleUpdateModal(menu)}
            toggleShowDeleteModal={() => this.toggleShowDeleteModal(menu)}
            menu={menu}
            key={menu.id}
          />))}
      </Accordion>
    );
  }

  render() {
    const { profile } = this.props;
    return (
      <div id="content-body">
        {empty(profile.businessName) ? this.renderSetupProfile() :
        <div>
          {this.renderAddButton()}
          {this.renderModal()}

          <div className="col-12" style={{ marginTop: 20 }}>
            {this.renderPagination()}
            {empty(this.state.thisPageMenus) ?
              <div id="no-menu">
                <h2>You have not created any menu</h2>
              </div> :
                this.renderAccordion()
              }
            {this.renderPagination()}
          </div>
        </div>}
      </div>
    );
  }
}

AdminMenus.propTypes = {
  user: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  postMenu: PropTypes.func.isRequired,
  getUserMenus: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  getMealsInMenu: PropTypes.func.isRequired,
};

export default AdminMenus;
