import React, { Component } from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import {
  Accordion,
} from 'react-accessible-accordion';

import Alert from '../presentation/partials/Alert';
import { addMenuModalStyle, deleteModalStyle } from './../../utilities/modalStyles';
import { Checkbox, BasicInput } from './form/BasicInput';
import SubmitButton from '../presentation/form/SubmitButton';
import validateMenu from '../../utilities/validateMenuForm';

import '../../../assets/css/fancy.css';
import MenuAccordion from './partials/MenuAccordion';
import loaderImage from '../../../assets/images/loader.gif';
import { convertUnixToDate } from '../../utilities/functions';

class AdminMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      name: '',
      menuCount: 0,
      mealsCount: 0,
      meals: [],
      thisPageMenus: [],
      mealsActivePage: 1,
      activePage: 1,
      updateMode: false,
      currentMenu: {},
      isShowingModal: false,
      isShowingDeleteMeal: false,
      selectedMeals: [],
      errors: {},
    };
    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.pushToProfile = this.pushToProfile.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShowDeleteModal = this.toggleShowDeleteModal.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.showOpsButtons = this.showOpsButtons.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleMealsPageChange = this.handleMealsPageChange.bind(this);
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.role !== 'caterer') {
      history.push('/');
    }
  }

  componentDidMount() {
    const { getProfile, profile, getUserMenus } = this.props;

    if (empty(profile)) {
      getProfile();
    }

    getUserMenus().then((response) => {
      if (response.status === 200) {
        this.setState({ thisPageMenus: response.data.menus, menuCount: response.data.count });
      }
    });
  }

  onCheckBoxChange(e, meal) {
    const meals = this.state.selectedMeals;
    if (e.target.checked) {
      meals.push({ mealId: meal.id, price: meal.price });
      this.setState({ selectedMeals: meals });
    } else {
      const index = meals.findIndex(x => x.mealId === e.target.value);
      meals.splice(index, 1);
      this.setState({ selectedMeals: meals });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getMenuExtraDays() {
    const unixTimeDiff = (new Date(this.state.endDate).getTime() / 1000) - (new Date(this.state.startDate).getTime() / 1000);
    return unixTimeDiff > 0 ? unixTimeDiff / 86400 : 0;
  }

  isValid() {
    this.setState({ errors: {} });
    const { errors, isValid } = validateMenu(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  resetFields() {
    this.setState({ startDate: '', endDate: '', name: '', selectedMeals: [], updateMode: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { postMenu, updateMenu } = this.props;
      const formData = {
        id: this.state.currentMenu.id,
        date: this.state.startDate,
        extraDays: this.getMenuExtraDays(),
        name: this.state.name,
        meals: this.state.selectedMeals,
      };

      if (this.state.updateMode) {
        updateMenu(formData).then((response) => {
          if (response.status === 200) {
            const { menu } = response.data;
            const { thisPageMenus } = this.state;
            const index = thisPageMenus.findIndex(x => x.id === menu.id);
            thisPageMenus[index] = menu;
            this.setState({ thisPageMenus: [] });
            const $this = this;
            setTimeout(() => {
              $this.setState({ thisPageMenus });
              $this.resetFields();
              $this.toggleShowModal();
            }, 300);
          }
        });
      } else {
        postMenu(formData).then((response) => {
          if (response.status === 201) {
            const menus = response.data.menus.concat(this.state.thisPageMenus).splice(0, 10);
            this.setState({ menusCount: this.state.menuCount + response.data.menus.length, thisPageMenus: menus });
            this.resetFields();
            this.toggleShowModal();
          }
        });
      }
    }
  }

  showOpsButtons(date) {
    const today = new Date().toISOString().split('T')[0];
    return today <= date;
  }

  deleteMenu() {
    const { deleteMenuById } = this.props;
    deleteMenuById(this.state.currentMenu.id).then((response) => {
      if (response.status === 200) {
        this.toggleShowDeleteModal({});
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
      this.resetFields();
      this.setState({ isShowingModal: !this.state.isShowingModal });
    } else {
      getMeals(9, 0).then((response) => {
        if (response.status === 200) {
          this.setState({ meals: response.data.meals, mealsCount: response.data.count, isShowingModal: !this.state.isShowingModal });
        }
      });
    }
  }

  toggleShowDeleteModal(menu) {
    swal({
      text: 'Are you sure want to delete this menu?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete'],
    })
      .then((willDelete) => {
        if (willDelete) {
          const { deleteMenuById } = this.props;
          deleteMenuById(menu.id).then((response) => {
            if (response.status === 200) {
              const pageMenus = this.state.thisPageMenus.filter(x => x.id !== menu.id);
              this.setState({ thisPageMenus: pageMenus, menuCount: this.state.menuCount - 1 });
            }
          });
        }
      });
  }

  toggleUpdateModal(menu) {
    const { getMeals, getMealsInMenu } = this.props;

    const selectedMeals = [];

    getMealsInMenu(menu, 0).then((res) => {
      if (res.response.status === 200) {
        res.response.data.map(item => selectedMeals.push({
          mealId: item.id,
          price: item.price,
        }));

        getMeals(9, 0).then((response) => {
          if (response.status === 200) {
            this.setState({
              meals: response.data.meals,
              mealsCount: response.data.count,
              isShowingModal: true,
              startDate: menu.date,
              selectedMeals,
              name: menu.name,
              updateMode: true,
              currentMenu: menu,
            });
          }
        });
      }
    });
  }

  isSelected(id) {
    return this.state.selectedMeals.findIndex(x => x.mealId === id) !== -1;
  }

  handlePageChange(pageNumber) {
    const { getUserMenus } = this.props;
    const offset = (pageNumber - 1) * 10;
    getUserMenus(offset).then((response) => {
      if (response.status === 200) {
        this.setState({ activePage: pageNumber, thisPageMenus: response.data.menus });
      }
    });
  }

  handleMealsPageChange(pageNumber) {
    const { getMeals } = this.props;
    const offset = (pageNumber - 1) * 10;
    getMeals(9, offset).then((response) => {
      if (response.status === 200) {
        this.setState({ mealsActivePage: pageNumber, meals: response.data.meals, mealsCount: response.data.count });
      }
    });
  }

  render() {
    const { formState, profile, menus } = this.props;
    const closeModalStyle = {
      float: 'right',
    };

    const showPagination = (
      <div>{ this.state.menuCount > 10 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={this.state.menuCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : '' }
      </div>
    );

    const showMealsPagination = (
      <div>{ this.state.mealsCount > 10 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.mealsActivePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.mealsCount}
            pageRangeDisplayed={5}
            onChange={this.handleMealsPageChange}
          />
        </div> : '' }
      </div>
    );

    const SetupProfile = (
			<div className="col-12" style={{ textAlign: 'center' }}>
				<h2>You have not created a Business Profile. You need a business profile before managing menus. Create a business profile first by clicking the link below.</h2>
				<button className="button" onClick={this.pushToProfile}>Setup Profile</button>
			</div>
    );

    const today = new Date().toISOString().split('T')[0];

    return (
			<div id="content-body">
				{empty(profile.businessName) ? SetupProfile :
					<div>
						<div className="col-12">
							<button onClick={this.toggleShowModal} className="button"><i className="ion-android-add" /> Add Menu</button>
							{empty(menus.alert) ? '' : <Alert alert={menus.alert} />}
						</div>

						<div>
							<Modal
								isOpen={this.state.isShowingModal}
								closeTimeoutMS={1}
								style={addMenuModalStyle}
								ariaHideApp={false}
								contentLabel="Modal"
							>
								<div className="col-12">
									<a title="close" onClick={this.toggleShowModal} style={closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
								</div>
								<div>
									{empty(this.state.meals) ?
										<div>
											No meals found. You must add meals to be able to create a Menu.
										</div> :
										<div>
											<form onSubmit={this.handleSubmit}>
												<div className="box-menu">
													<h3>{ this.state.updateMode ? 'Update' : 'Set Daily' } Menu</h3>
													<div className="show-errors">
														<ul>
															{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
															{empty(menus.errors) ? '' : Object.keys(menus.errors).map(item => <li key={item}>{ menus.errors[item] }</li>)}
														</ul>
													</div>
                          <BasicInput
                          name="startDate"
                          type="date"
                          min={today}
                          label="Start Date"
                          value={this.state.startDate}
                          onChange={this.onChange}
                          hasError={this.state.errors.date !== undefined}
                          />
                          { this.state.updateMode ? '' :
                            <BasicInput
                              name="endDate"
                              type="date"
                              min={this.state.startDate}
                              label="End Date (optional)"
                              value={this.state.endDate}
                              onChange={this.onChange}
                              hasError={this.state.errors.endDate !== undefined}
                            />
                          }
													<BasicInput name="name" type="text" label="Menu Name (optional)" value={this.state.name} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
													<div style={{ fontSize: 18, marginTop: 45 }}><span className="number-badge">{ this.state.selectedMeals.length }</span> meals selected</div>
												</div>
                        <div id="meals-checkBox">
                            {this.state.meals.map(item => <Checkbox isChecked={this.isSelected(item.id)} meal={item} key={item.id} onChange={e => this.onCheckBoxChange(e, item)} />)}
                            <div style={{ textAlign: 'center' }}>
                              {showMealsPagination}
                            </div>
                        </div>
                        <div id="meals" style={{ textAlign: 'right' }}>
                          <hr />
                          <SubmitButton className="button" value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
                        </div>
											</form>
										</div>}
								</div>
							</Modal>
						</div>
						<div>
							<Modal
								isOpen={this.state.isShowingDeleteMeal}
								closeTimeoutMS={1}
								style={deleteModalStyle}
								ariaHideApp={false}
								contentLabel="Modal"
							>
								<div>
									<p>Menu For: <b>{convertUnixToDate(this.state.currentMenu.unixTime)}</b></p>
									<p>Are you sure you want to delete this menu?</p>
									<br />
									<p>
										<button onClick={this.toggleShowDeleteModal} className="button-default">Close</button>
										<button onClick={this.deleteMenu} className="button-error" disabled={formState.isLoading}>Delete</button>
										<img style={{ float: 'right' }} src={loaderImage} alt="loader" hidden={!formState.isLoading} />
									</p>
								</div>
							</Modal>
						</div>
						<div className="col-12" style={{ marginTop: 20 }}>
              { showPagination }

							{ empty(this.state.thisPageMenus) ? <div>You have not created any menu</div> :
								<Accordion>
									{ this.state.thisPageMenus.map(menu => <MenuAccordion showOpsButtons={this.showOpsButtons(menu.date)} getMealsInMenu={this.props.getMealsInMenu} toggleUpdateModal={() => this.toggleUpdateModal(menu)} toggleShowDeleteModal={() => this.toggleShowDeleteModal(menu)} menu={menu} key={menu.id} />) }
								</Accordion>
              }

              { showPagination }
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
  deleteMenuById: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  getMealsInMenu: PropTypes.func.isRequired,
};

export default AdminMenus;
