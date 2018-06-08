import React, { Component } from 'react';
import empty from 'is-empty';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Alert from '../presentation/partials/Alert';
import { addMenuModalStyle, deleteModalStyle } from './../../utilities/modalStyles';
import { Checkbox, BasicInput, SubmitButton } from './form/BasicInput';


class AdminMenus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			name: '',
			updateMode: true,
			isShowingModal: false,
			selectedMeals: [],
			errors: {},
		};
		this.toggleShowModal = this.toggleShowModal.bind(this);
		this.pushToProfile = this.pushToProfile.bind(this);
		this.onCheckBoxChange = this.onChange.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		const { user, history, getProfile, profile } = this.props;
		if (user.role !== 'caterer') {
			history.push('/');
		}

		if (empty(profile)) {
			getProfile();
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


	pushToProfile() {
		const { history } = this.props;
		history.push('/caterer/business_profile');
	}

	toggleShowModal() {
		const { meals, getMeals } = this.props;
		if (empty(meals.meals)) {
			getMeals();
		}
		this.setState({ isShowingModal: !this.state.isShowingModal });
	}

	render() {
		const { formState, profile, menus, meals } = this.props;
		const closeModalStyle = {
			float: 'right',
			marginBottom: -16,
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
									<div className="show-errors">
										<ul>
											{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
											{empty(menus.errors) ? '' : Object.keys(menus.errors).map(item => <li key={item}>{ menus.errors[item] }</li>)}
										</ul>
									</div>
									{empty(meals.meals) ?
										<div>
											No meals found. You must add meals to be able to create a Menu.
										</div> :
										<div>
											<form onSubmit={this.handleSubmit}>
												<div className="box">
													<h3>Set Daily Menu</h3>
													<BasicInput name="name" type="date" label="Menu Date" value={this.state.date} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
													<BasicInput name="name" type="text" label="Menu Name (optional)" value={this.state.name} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
													<p style={{ fontSize: 18, marginTop: 45 }}><b>{ this.state.selectedMeals.length } </b>meals selected</p>
													<SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
												</div>
												<div id="meals-checkBox">
													{meals.meals.map(item => <Checkbox meal={item} key={item.id} onChange={this.onCheckBoxChange} />)}
												</div>
												<span id="checkBox-label">Scroll to view all meals</span>
											</form>
										</div>}
								</div>
							</Modal>
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
};

export default AdminMenus;
