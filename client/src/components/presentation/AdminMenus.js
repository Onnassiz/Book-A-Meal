import React, { Component } from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
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
import { convertUnixToDate, convertUnixToDateForUpdate } from '../../utilities/functions';


class AdminMenus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
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

	onCheckBoxChange(e) {
		const meals = this.state.selectedMeals;
		if (e.target.checked) {
			meals.push({ mealId: e.target.value });
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

	getCurrentDate() {
		const today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1; // January is 0!
		const yyyy = today.getFullYear();

		if (dd < 10) {
			dd = `0${dd}`;
		}

		if (mm < 10) {
			mm = `0${mm}`;
		}

		return `${yyyy}/${mm}/${dd}`;
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
		this.setState({ date: '', name: '', selectedMeals: [], updateMode: false });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			const { postMenu, updateMenu } = this.props;
			const formData = {
				id: this.state.currentMenu.id,
				unixTime: new Date(this.state.date).getTime() / 1000,
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

	showOpsButtons(unixTime) {
		const currentTime = new Date(this.getCurrentDate()).getTime() / 1000;
		return currentTime <= unixTime;
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
		this.setState({ isShowingDeleteMeal: !this.state.isShowingDeleteMeal, currentMenu: menu });
	}

	toggleUpdateModal(menu) {
		const { meals, getMeals } = this.props;
		if (empty(meals.meals)) {
			getMeals();
		}

		const selectedMeals = [];
		menu.meals.forEach((item) => {
			selectedMeals.push({ mealId: item.id });
		});
		this.setState({
			date: convertUnixToDateForUpdate(menu.unixTime),
			selectedMeals,
			name: menu.name,
			isShowingModal: true,
			updateMode: true,
			currentMenu: menu,
		});
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

		return (
			<div id="content2" style={{ paddingBottom: 700 }}>
				{empty(profile.businessName) ? SetupProfile :
					<div>
						<button onClick={this.toggleShowModal} className="button">Add Menu</button>
						{empty(menus.alert) ? '' : <Alert alert={menus.alert} />}

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
												<div className="box">
													<h3>{ this.state.updateMode ? 'Update' : 'Set Daily' } Menu</h3>
													<div className="show-errors">
														<ul>
															{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
															{empty(menus.errors) ? '' : Object.keys(menus.errors).map(item => <li key={item}>{ menus.errors[item] }</li>)}
														</ul>
													</div>
													<BasicInput name="date" type="date" label="Menu Date" value={this.state.date} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
													<BasicInput name="name" type="text" label="Menu Name (optional)" value={this.state.name} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
													<p style={{ fontSize: 18, marginTop: 45 }}><b>{ this.state.selectedMeals.length } </b>meals selected</p>
													<SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
												</div>
												<div id="meals-checkBox">
													{meals.meals.map(item => <Checkbox isChecked={this.isSelected(item.id)} meal={item} key={item.id} onChange={this.onCheckBoxChange} />)}
												</div>
												<span id="checkBox-label">Scroll to view all meals</span>
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
						<div className="col-11" style={{ marginTop: 20 }}>
							{ empty(menus.menus) ? '' :
								<Accordion>
									{ menus.menus.map(menu => <MenuAccordion showOpsButtons={this.showOpsButtons(menu.unixTime)} toggleUpdateModal={() => this.toggleUpdateModal(menu)} toggleShowDeleteModal={() => this.toggleShowDeleteModal(menu)} menu={menu} key={menu.id} />) }
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
};

export default AdminMenus;
