import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import ImageUploader from '../presentation/partials/ImageUploader';
import MealModal from './partials/Meal/MealModal';
import MealsTable from './partials/Meal/MealTable';


class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      mealsCount: 0,
      activePage: 1,
      updateMode: false,
      currentMeal: {},
      isShowingModal: false,
      isShowingAddPhoto: false,
      isShowingDropZoneModal: false,
    };
    this.bindFunctions();
  }

  componentDidMount() {
    document.title = 'Meals - Just Eat';
    const {
      getProfile, profile, getMeals, user, history,
    } = this.props;

    if (user.role !== 'caterer' || !user.role) {
      history.push('/');
    } else {
      if (empty(profile)) {
        getProfile();
      }

      getMeals(10, 0).then((response) => {
        if (response.status === 200) {
          this.setState({ meals: response.data.meals, mealsCount: response.data.count });
        }
      });
    }
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
        this.updateComponentMeals(response.data.meal);
        toast('Image successfully uploaded.');
      }
    });
  }

  handleAddButtonClick() {
    if (this.state.updateMode) {
      this.setState({ updateMode: false, currentMeal: {} });
    }
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  pushToProfile() {
    const { history } = this.props;
    history.push('/caterer/business_profile');
  }

  bindFunctions() {
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.toggleDropZone = this.toggleDropZone.bind(this);
    this.pushToProfile = this.pushToProfile.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
    this.toggleShowDeleteModal = this.toggleShowDeleteModal.bind(this);
    this.toggleAddPhoto = this.toggleAddPhoto.bind(this);
    this.putImage = this.putImage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addToMeals = this.addToMeals.bind(this);
    this.updateComponentMeals = this.updateComponentMeals.bind(this);
  }

  toggleUpdateModal(meal) {
    this.setState({
      updateMode: true,
      isShowingModal: !this.state.isShowingModal,
      currentMeal: meal,
    });
  }

  toggleShowDeleteModal(meal) {
    swal({
      text: `Are you sure want to delete ${meal.name}?`,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete'],
    }).then((willDelete) => {
      this.deleteMeal(willDelete, meal);
    });
  }

  deleteMeal(willDelete, meal) {
    if (willDelete) {
      const { deleteMealById } = this.props;
      return deleteMealById(meal.id).then((response) => {
        if (response.status === 200) {
          const meals = this.state.meals.filter(x => x.id !== meal.id);
          swal('Deleted!', 'Your meal has been deleted', 'success');
          if (meals.length) {
            this.setState({
              currentMeal: {}, meals, mealsCount: this.state.mealsCount - 1,
            });
          } else {
            this.handlePageChange(1);
          }
          return response;
        }
      });
    }
  }

  toggleAddPhoto(meal) {
    this.setState({
      isShowingAddPhoto: !this.state.isShowingAddPhoto,
      currentMeal: empty(this.state.currentMeal) ? meal : {},
    });
  }

  handlePageChange(pageNumber) {
    const { getMeals } = this.props;
    const offset = (pageNumber - 1) * 10;
    getMeals(10, offset).then((response) => {
      if (response.status === 200) {
        this.setState({
          activePage: pageNumber,
          meals: response.data.meals,
          mealsCount:
            response.data.count,
        });
      }
    });
  }

  addToMeals(meal) {
    const meals = [meal].concat(this.state.meals).splice(0, 10);
    this.handleAddButtonClick();
    this.setState({ meals, mealsCount: this.state.mealsCount + 1 });
  }

  updateComponentMeals(meal) {
    const { meals } = this.state;
    const index = meals.findIndex(x => x.id === meal.id);
    meals[index] = meal;
    this.setState({ meals });
    return this.state.updateMode ? this.handleAddButtonClick() : this.toggleAddPhoto();
  }

  renderPagination() {
    return (
      <div>{this.state.mealsCount > 10 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            onChange={this.handlePageChange}
            hideDisabled
            activePage={this.state.activePage}
            totalItemsCount={this.state.mealsCount}
            pageRangeDisplayed={5}
            itemsCountPerPage={10}
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
          You need a business profile before managing meals.
          Create a business profile first by clicking the link below.
        </h2>
        <button id="gotoProfile" className="button" onClick={this.pushToProfile}>Setup Profile</button>
      </div>
    );
  }

  renderMealModalAndTable() {
    const {
      formState, meals, updateMeal, postMeal,
    } = this.props;
    return (
      <div>
        <MealModal
          state={this.state}
          formState={formState}
          meals={meals}
          updateMeal={updateMeal}
          updateComponentMeals={this.updateComponentMeals}
          addToMeals={this.addToMeals}
          postMeal={postMeal}
          isShowingModal={this.state.isShowingModal}
          handleAddButtonClick={this.handleAddButtonClick}
        />
        <MealsTable
          state={this.state}
          toggleAddPhoto={this.toggleAddPhoto}
          toggleUpdateModal={this.toggleUpdateModal}
          toggleShowDeleteModal={this.toggleShowDeleteModal}
        />
      </div>
    );
  }

  render() {
    const { profile } = this.props;

    return (
      <div id="content-body">
        {empty(profile.businessName) ? this.renderSetupProfile() :
        <div className="col-12">
          <button id="addMeal" onClick={this.handleAddButtonClick} className="button"><i className="ion-android-add" /> Add Meal</button>
          <div>
            {this.renderPagination()}
            {this.renderMealModalAndTable()}
            {this.renderPagination()}
            <ImageUploader
              putImage={this.putImage}
              isShowingAddPhoto={this.state.isShowingAddPhoto}
              toggleAddPhoto={this.toggleAddPhoto}
            />
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
