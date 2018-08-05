import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import empty from 'is-empty';
import swal from 'sweetalert';
import Pagination from 'react-js-pagination';
import { addProfileModalStyle, addProfileImageModalView } from './../../utilities/modalStyles';
import { BasicInput, TextArea } from './form/BasicInput';
import SubmitButton from '../presentation/form/SubmitButton';
import validateMeal from '../../utilities/validateMealForm';
import Alert from '../presentation/partials/Alert';
import ImageUploader from '../presentation/partials/ImageUploader';
import MealsTableRow from './partials/MealsTableRow';

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      meals: [],
      mealsCount: 0,
      activePage: 1,
      category: '',
      description: '',
      updateMode: false,
      currentMeal: {},
      isShowingModal: false,
      isShowingAddPhoto: false,
      isShowingDeleteMeal: false,
      isShowingDropZoneModal: false,
      errors: {},
    };
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.toggleDropZone = this.toggleDropZone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pushToProfile = this.pushToProfile.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
    this.toggleShowDeleteModal = this.toggleShowDeleteModal.bind(this);
    this.toggleAddPhoto = this.toggleAddPhoto.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
    this.putImage = this.putImage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    const { user, history, getProfile, profile, getMeals } = this.props;
    if (user.role !== 'caterer') {
      history.push('/');
    }

    if (empty(profile)) {
      getProfile();
    }

    getMeals(10, 0).then((response) => {
      if (response.status === 200) {
        this.setState({ meals: response.data.meals, mealsCount: response.data.count });
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleDropZone() {
    this.setState({ isShowingDropZoneModal: !this.state.isShowingDropZoneModal });
  }

  putImage(image) {
    const { updateMeal } = this.props;
    const field = {
      imageUrl: image,
      id: this.state.currentMeal.id,
    };

    updateMeal(field).then((response) => {
      if (response.status === 200) {
        const { meal } = response.data;
        const { meals } = this.state;
        const index = meals.findIndex(x => x.id === meal.id);
        meals[index] = meal;
        this.toggleAddPhoto();
        this.setState({ meals });
      }
    });
  }

  isValid() {
    this.setState({ errors: {} });
    const { errors, isValid } = validateMeal(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleAddButtonClick() {
    this.resetFields();
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { postMeal, updateMeal } = this.props;

      const formData = {
        id: this.state.id,
        name: this.state.name,
        category: this.state.category,
        price: parseInt(this.state.price, 10),
        description: this.state.description,
      };

      if (!this.state.updateMode) {
        postMeal(formData).then((response) => {
          if (response.status === 201) {
            const meals = [response.data.meal].concat(this.state.meals).splice(0, 10);
            this.handleAddButtonClick();
            this.setState({ meals, mealsCount: this.state.mealsCount + 1 });
          }
        });
      } else {
        updateMeal(formData).then((response) => {
          if (response.status === 200) {
            const { meal } = response.data;
            const { meals } = this.state;
            const index = meals.findIndex(x => x.id === meal.id);
            meals[index] = meal;
            this.handleAddButtonClick();
            this.setState({ meals });
          }
        });
      }
    }
  }

  pushToProfile() {
    const { history } = this.props;
    history.push('/caterer/business_profile');
  }

  resetFields() {
    this.setState({
      updateMode: false,
      name: '',
      price: '',
      description: '',
      category: '',
      id: '',
    });
  }

  toggleUpdateModal(item) {
    this.setState({
      updateMode: true,
      name: item.name,
      price: item.price.toString(),
      description: item.description === null ? '' : item.description,
      category: item.category,
      id: item.id,
      isShowingModal: !this.state.isShowingModal,
    });
  }

  toggleShowDeleteModal(meal) {
    swal({
      text: `Are you sure want to delete ${meal.name}?`,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete'],
    })
      .then((willDelete) => {
        if (willDelete) {
          const { deleteMealById } = this.props;
          deleteMealById(meal.id).then((response) => {
            if (response.status === 200) {
              const meals = this.state.meals.filter(x => x.id !== meal.id);
              this.setState({ currentMeal: {}, meals });
              swal('Deleted!', 'Your meal has been deleted', 'success');
            }
          });
        }
      });
  }

  toggleAddPhoto(meal) {
    this.setState({ isShowingAddPhoto: !this.state.isShowingAddPhoto, currentMeal: meal });
  }

  deleteMeal() {
    const { deleteMealById } = this.props;
    deleteMealById(this.state.currentMeal.id).then((response) => {
      if (response.status === 200) {
        this.toggleShowDeleteModal(false);
        this.setState({ currentMeal: {} });
      }
    });
  }

  handlePageChange(pageNumber) {
    const { getMeals } = this.props;
    const offset = (pageNumber - 1) * 10;
    getMeals(10, offset).then((response) => {
      if (response.status === 200) {
        this.setState({ activePage: pageNumber, meals: response.data.meals, mealsCount: response.data.count });
      }
    });
  }

  render() {
    const { formState, profile, meals, user } = this.props;
    const closeModalStyle = {
      float: 'right',
    };

    const showPagination = (
      <div>{ this.state.mealsCount > 10 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.mealsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : '' }
      </div>
    );

    const SetupProfile = (
			<div className="col-12" style={{ textAlign: 'center' }}>
				<h2>You have not created a Business Profile. You need a business profile before managing meals. Create a business profile first by clicking the link below.</h2>
				<button className="button" onClick={this.pushToProfile}>Setup Profile</button>
			</div>
    );

    return (
			<div id="content-body">
				{empty(profile.businessName) ? SetupProfile :
					<div className="col-12">
						<button onClick={this.handleAddButtonClick} className="button"><i className="ion-android-add" /> Add Meal</button>
						{empty(meals.alert) ? '' : <Alert alert={meals.alert} />}
						<div>
							<Modal
								isOpen={this.state.isShowingModal}
								closeTimeoutMS={1}
								style={addProfileModalStyle}
								ariaHideApp={false}
                contentLabel="Modal"
                className="create-profile"
							>
								<div className="col-12">
									<a onClick={this.handleAddButtonClick} style={closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
								</div>
								<div className="box">
									<h3>{this.state.updateMode ? 'Update Meal' : 'Add Meal'}</h3>
									<div className="show-errors">
										<ul>
											{Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
											{empty(meals.errors) ? '' : Object.keys(meals.errors).map(item => <li key={item}>{ meals.errors[item] }</li>)}
										</ul>
									</div>
									<form onSubmit={this.handleSubmit}>
										<BasicInput name="name" type="text" label="Meal's Name" value={this.state.name} onChange={this.onChange} hasError={this.state.errors.name !== undefined} />
										<BasicInput name="price" type="number" label="Unit Price" value={this.state.price} onChange={this.onChange} hasError={this.state.errors.price !== undefined} />
										<BasicInput name="category" type="text" label="Category" value={this.state.category} onChange={this.onChange} hasError={this.state.errors.category !== undefined} />
										<TextArea name="description" type="text" label="Description" value={this.state.description} onChange={this.onChange} />
										<SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
									</form>
								</div>
							</Modal>
						</div>

						<div>
							<Modal
								isOpen={this.state.isShowingAddPhoto}
								closeTimeoutMS={1}
								style={addProfileImageModalView}
								ariaHideApp={false}
                contentLabel="Modal"
                className="image-upload"
							>
								<div className="col-12">
									<div className="col-12">
										<a onClick={this.toggleAddPhoto} style={{ float: 'right' }}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
									</div>
									<ImageUploader putImage={this.putImage} />
								</div>
							</Modal>
						</div>

						<div className="col-12">
              {showPagination}
							{empty(this.state.meals) ? '' :
								<div>
									<table className="meals-table">
										<thead>
											<tr>
												<th>S/N</th>
												<th>Meal Name</th>
												<th>Price</th>
												<th>Category</th>
												<th>Date Created</th>
												<th>Added By</th>
												<th>More</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{this.state.meals.map((item, i) => <MealsTableRow toggleAddPhoto={() => this.toggleAddPhoto(item)} userId={user.id} toggleShowDeleteModal={() => this.toggleShowDeleteModal(item)} toggleUpdateModal={() => this.toggleUpdateModal(item)} item={item} key={item.id} i={i + 1} />)}
										</tbody>
									</table>
								</div>
              }
              {showPagination}
						</div>
					</div>
				}
			</div>
    );
  }
}

Meals.propTypes = {
  user: PropTypes.object.isRequired,
  meals: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  postMeal: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  deleteMealById: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

export default Meals;
