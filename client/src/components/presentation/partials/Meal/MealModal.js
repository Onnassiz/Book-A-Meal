/* eslint react/no-unused-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { BasicInput, TextArea } from './../../form/BasicInput';
import SubmitButton from '../../../presentation/form/SubmitButton';
import ShowErrors from './../../partials/ShowErrors';
import { addProfileModalStyle } from './../../../../utilities/modalStyles';
import validateMeal from '../../../../utilities/validateMealForm';


class MealModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeModalStyle: { float: 'right' },
      id: '',
      name: '',
      price: '',
      hasServerErrors: false,
      category: '',
      description: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  afterOpenModal() {
    const { state } = this.props;
    this.resetFields();
    if (state.updateMode) {
      this.setState({
        id: state.currentMeal.id,
        name: state.currentMeal.name,
        category: state.currentMeal.category,
        price: state.currentMeal.price,
        description: state.currentMeal.description,
      });
    }
  }

  updateMeal(formData) {
    const { updateMeal, updateComponentMeals } = this.props;
    updateMeal(formData).then((response) => {
      if (response.status === 200) {
        const { meal } = response.data;
        this.resetFields();
        toast(response.data.message);
        updateComponentMeals(meal);
      } else {
        this.setState({ hasServerErrors: true });
      }
    });
  }

  resetFields() {
    this.setState({
      hasServerErrors: false,
      name: '',
      price: '',
      description: '',
      category: '',
      id: '',
      errors: {},
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

  addMeal(formData) {
    const { postMeal, addToMeals } = this.props;
    postMeal(formData).then((response) => {
      if (response.status === 201) {
        this.resetFields();
        addToMeals(response.data.meal);
        toast(response.data.message);
      } else {
        this.setState({ hasServerErrors: true });
      }
    });
  }

  handleSubmit(e) {
    const { state } = this.props;
    e.preventDefault();
    const formData = {
      id: state.currentMeal.id,
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      description: this.state.description,
    };

    if (this.isValid()) {
      if (!state.updateMode) {
        this.addMeal(formData);
      } else {
        this.updateMeal(formData);
      }
    }
  }

  renderNameField() {
    return (
      <div>
        <BasicInput
          name="name"
          type="text"
          label="Meal's Name"
          value={this.state.name}
          onChange={this.onChange}
          hasError={this.state.errors.name !== undefined}
        />
      </div>
    );
  }

  renderPriceField() {
    return (
      <div>
        <BasicInput
          name="price"
          type="number"
          label="Unit Price"
          value={this.state.price}
          onChange={this.onChange}
          hasError={this.state.errors.price !== undefined}
        />
      </div>
    );
  }

  renderCategoryField() {
    return (
      <div>
        <BasicInput
          name="category"
          type="text"
          label="Category"
          value={this.state.category}
          onChange={this.onChange}
          hasError={this.state.errors.category !== undefined}
        />
      </div>
    );
  }

  renderBasicInputs() {
    return (
      <div>
        {this.renderNameField()}
        {this.renderPriceField()}
        {this.renderCategoryField()}
      </div>
    );
  }

  renderModalBody() {
    const {
      meals, formState, state, handleAddButtonClick,
    } = this.props;
    return (
      <div>
        <div className="col-12">
          <a onClick={handleAddButtonClick} style={this.state.closeModalStyle}>
            <i style={{ fontSize: 25 }} className="material-icons">close</i>
          </a>
        </div>
        <div className="box">
          <h3>{state.updateMode ? 'Update Meal' : 'Add Meal'}</h3>
          <ShowErrors
            clientErrors={this.state.errors}
            serverErrors={this.state.hasServerErrors ? meals.errors : {}}
          />
          <form onSubmit={this.handleSubmit}>
            {this.renderBasicInputs()}
            <TextArea name="description" type="text" label="Description" value={this.state.description} onChange={this.onChange} />
            <SubmitButton value={state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
          </form>
        </div>
      </div>
    );
  }

  renderMealsModal() {
    const { state, handleAddButtonClick } = this.props;
    return (
      <Modal
        isOpen={state.isShowingModal}
        closeTimeoutMS={1}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={handleAddButtonClick}
        onAfterOpen={this.afterOpenModal}
        style={addProfileModalStyle}
        ariaHideApp={false}
        contentLabel="Modal"
        className="create-profile"
      >
        {this.renderModalBody()}
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.renderMealsModal()}
      </div>
    );
  }
}

MealModal.propTypes = {
  state: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  meals: PropTypes.object.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  postMeal: PropTypes.func.isRequired,
  addToMeals: PropTypes.func.isRequired,
  updateComponentMeals: PropTypes.func.isRequired,
};

export default MealModal;
