import React, { Component } from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Modal from 'react-modal';
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
  }

  componentWillMount() {
    const { user, history, getProfile, profile, getUserMenus, menus } = this.props;
    if (user.role !== 'caterer') {
      history.push('/');
    }

    if (empty(profile)) {
      getProfile();
    }

    if (empty(menus.menus)) {
      getUserMenus();
    }
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
            this.resetFields();
            this.toggleShowModal();
          }
        });
      } else {
        postMenu(formData).then((response) => {
          if (response.status === 201) {
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
    const { meals, getMeals } = this.props;
    if (empty(meals.meals)) {
      getMeals();
    }
    if (this.state.isShowingModal) {
      this.resetFields();
    }
    this.setState({ isShowingModal: !this.state.isShowingModal });
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
              this.setState({ currentMeal: {} });
              swal('Deleted!', 'Your menu has been deleted', 'success');
            }
          });
        }
      });
  }

  toggleUpdateModal(menu) {
    const { meals, getMeals } = this.props;
    if (empty(meals.meals)) {
      getMeals();
    }

    const selectedMeals = [];
    this.setState({
      startDate: menu.date,
      selectedMeals,
      name: menu.name,
      isShowingModal: true,
      updateMode: true,
      currentMenu: menu,
    });
    // getMealsInMenu(menu.meals).then((menuMeals) => {
    //   menuMeals.forEach((item) => {
    //     selectedMeals.push({ mealId: item.id, price: item.price });
    //   });
    // });
  }

  isSelected(id) {
    return this.state.selectedMeals.findIndex(x => x.mealId === id) !== -1;
  }

  render() {
    const { formState, profile, menus, meals } = this.props;
    const closeModalStyle = {
      float: 'right',
    };

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
									{empty(meals.meals) ?
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
													<BasicInput name="startDate" type="date" min={today} label="Start Date" value={this.state.startDate} onChange={this.onChange} hasError={this.state.errors.date !== undefined} />
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
													<div style={{ fontSize: 18, marginTop: 45 }}><b>{ this.state.selectedMeals.length } </b>meals selected</div>
													<SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
												</div>
												<div id="meals-checkBox">
													{meals.meals.map(item => <Checkbox isChecked={this.isSelected(item.id)} meal={item} key={item.id} onChange={e => this.onCheckBoxChange(e, item)} />)}
												</div>
												<span id="checkBox-label">Scroll to view more meals</span>
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
							{ empty(menus.menus) ? <div>You have not created any menu</div> :
								<Accordion>
									{ menus.menus.map(menu => <MenuAccordion showOpsButtons={this.showOpsButtons(menu.date)} toggleUpdateModal={() => this.toggleUpdateModal(menu)} toggleShowDeleteModal={() => this.toggleShowDeleteModal(menu)} menu={menu} key={menu.id} />) }
								</Accordion>
							}
						</div>
					</div>}
			</div>
    );
  }
}

AdminMenus.propTypes = {
  user: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  meals: PropTypes.object.isRequired,
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
