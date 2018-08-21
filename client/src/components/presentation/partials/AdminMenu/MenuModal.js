import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import empty from 'is-empty';
import { toast } from 'react-toastify';
import { addMenuModalStyle } from './../../../../utilities/modalStyles';
import { Checkbox, BasicInput } from './../../form/BasicInput';
import ShowErrors from './../../partials/ShowErrors';
import SubmitButton from '../../../presentation/form/SubmitButton';
import validateMenu from '../../../../utilities/validateMenuForm';
import { handleSubmit } from '../../../../utilities/adminMenusHelper';

class MenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeModalStyle: { float: 'right' },
      errors: {},
      name: '',
      endDate: '',
      selectedMeals: [],
      startDate: new Date().toISOString().split('T')[0],
    };
    this.onChange = this.onChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  getMenuExtraDays() {
    const endDate = (new Date(this.state.endDate).getTime() / 1000);
    const startDate = (new Date(this.state.startDate).getTime() / 1000);
    const unixTimeDiff = endDate - startDate;
    return unixTimeDiff > 0 ? unixTimeDiff / 86400 : 0;
  }

  isSelected(id) {
    return this.state.selectedMeals.findIndex(x => x.mealId === id) !== -1;
  }

  afterOpenModal() {
    const { state } = this.props;
    this.resetFields();
    if (state.updateMode) {
      this.setState({
        selectedMeals: state.selectedMeals,
        startDate: state.currentMenu.date,
        name: state.currentMenu.name,
      });
    }
  }

  isValid(formData) {
    this.setState({ errors: {} });
    const { errors, isValid } = validateMenu(formData);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  resetFields() {
    this.setState({
      startDate: '', endDate: '', name: '', selectedMeals: [], updateMode: false,
    });
  }

  createNewMenu(formData) {
    const { postMenu, addToViewMenus } = this.props;
    postMenu(formData).then((response) => {
      if (response.status === 201) {
        toast('Menu(s) successfully created');
        addToViewMenus(response.data.menus);
      }
    });
  }

  updateExistingMenu(formData) {
    const { updateMenu, updateViewMenus } = this.props;
    updateMenu(formData).then((response) => {
      if (response.status === 200) {
        toast('Menu successfully updated');
        updateViewMenus(response.data.menu);
      }
    });
  }

  renderMenuModal() {
    const { state, toggleShowModal } = this.props;
    return (
      <Modal
        isOpen={state.isShowingModal}
        closeTimeoutMS={1}
        onAfterOpen={this.afterOpenModal}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={toggleShowModal}
        style={addMenuModalStyle}
        ariaHideApp={false}
        contentLabel="Modal"
      >
        <div className="col-12">
          <a title="close" onClick={toggleShowModal} style={this.state.closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
        </div>
        {empty(state.meals) ?
          <div>
            No meals found. You must add meals to be able to create a Menu.
          </div> : this.renderMenuModalBody()}
      </Modal>
    );
  }

  renderStartDate() {
    const today = new Date().toISOString().split('T')[0];
    return (
      <div>
        <BasicInput
          name="startDate"
          type="date"
          min={today}
          label="Start Date"
          value={this.state.startDate}
          onChange={this.onChange}
          hasError={this.state.errors.date !== undefined}
        />
      </div>
    );
  }

  renderDatesAndName() {
    const today = new Date().toISOString().split('T')[0];
    const { state } = this.props;
    return (
      <div>
        {state.updateMode ? '' :
        <BasicInput
          name="endDate"
          onChange={this.onChange}
          type="date"
          min={this.state.startDate === '' ? today : this.state.startDate}
          label="End Date (optional)"
          value={this.state.endDate}
          hasError={this.state.errors.endDate !== undefined}
        />
        }
        <BasicInput
          name="name"
          type="text"
          label="Menu Name (optional)"
          value={this.state.name}
          onChange={this.onChange}
          hasError={this.state.errors.name !== undefined}
        />
      </div>
    );
  }

  renderMeals() {
    const { state } = this.props;
    return (
      <div id="meals-checkBox">
        {state.meals.map(item =>
          (<Checkbox
            isChecked={this.isSelected(item.id)}
            meal={item}
            key={item.id}
            onChange={e => this.onCheckBoxChange(e, item)}
          />))}
        {this.renderMealsPagination()}
      </div>
    );
  }

  renderMealsPagination() {
    const { state, handlePageChange } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>{state.mealsCount > 9 ?
        <Pagination
          itemsCountPerPage={9}
          totalItemsCount={state.mealsCount}
          pageRangeDisplayed={5}
          hideDisabled
          activePage={state.mealsActivePage}
          onChange={number => handlePageChange(number)}
        /> : ''}
      </div>
    );
  }

  renderMenuModalBody() {
    const { menus, formState, state } = this.props;
    return (
      <div>
        <form onSubmit={e => handleSubmit(e, this)}>
          <div className="box-menu">
            <h3>{this.state.updateMode ? 'Update' : 'Set Daily'} Menu</h3>
            <ShowErrors clientErrors={this.state.errors} serverErrors={menus.errors || {}} />
            {this.renderStartDate()}
            {this.renderDatesAndName()}
            <div style={{ fontSize: 18, marginTop: 45 }}>
              <span className="number-badge">{this.state.selectedMeals.length}</span> meals selected
            </div>
          </div>
          {this.renderMeals()}
          <div id="meals" style={{ textAlign: 'right' }}>
            <hr />
            <SubmitButton className="button" value={state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderMenuModal()}</div>
    );
  }
}

MenuModal.propTypes = {
  state: PropTypes.object.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  postMenu: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  addToViewMenus: PropTypes.func.isRequired,
  updateViewMenus: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default MenuModal;
