import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuModal from '../../../src/components/presentation/partials/AdminMenu/MenuModal';
import { getMealsMock, singleMeal } from '../../objectProps/meals.props';
import { singleMenu } from '../../objectProps/menus.props';
import { postMenu, updateMenu } from '../../promiseProps/menus.props';

const props = {
  state: {
    selectedMeals: [], updateMode: true, meals: getMealsMock(5), currentMenu: singleMenu,
  },
  toggleShowModal: jest.fn(),
  menus: { errors: {} },
  formState: { isLoading: false },
  postMenu,
  updateMenu,
  addToViewMenus: jest.fn(),
  updateViewMenus: jest.fn(),
  handlePageChange: jest.fn(),
};

const wrapper = shallow(<MenuModal {...props} />);

describe('<MenuModal />', () => {
  it('Should render Menu Modal page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call onChange method to update handle input change', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const firstEvent = {
      target: {
        name: 'startDate',
        value: '2019-12-12',
      },
    };
    wrapper.instance().onChange(firstEvent);
    expect(wrapper.state().startDate).toBe('2019-12-12');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('Should call onCheckBoxChange method to update handle input change', () => {
    const onCheckBoxChangeSpy = jest.spyOn(wrapper.instance(), 'onCheckBoxChange');
    const event = {
      target: {
        checked: true,
      },
    };
    const meal = singleMeal;
    wrapper.instance().onCheckBoxChange(event, meal);

    expect(wrapper.state().selectedMeals.length).toBe(1);
    expect(onCheckBoxChangeSpy).toHaveBeenCalled();
  });

  it('Should call onCheckBoxChange method to update handle input change when checkbox is unchecked', () => {
    const onCheckBoxChangeSpy = jest.spyOn(wrapper.instance(), 'onCheckBoxChange');
    const event = {
      target: {
        checked: false,
      },
    };

    const meal = singleMeal;
    wrapper.instance().onCheckBoxChange(event, meal);

    expect(wrapper.state().selectedMeals.length).toBe(0);
    expect(onCheckBoxChangeSpy).toHaveBeenCalled();
  });

  it('Should call isSelected method and return a boolean value that tells if a meal is checked', () => {
    const isSelectedSpy = jest.spyOn(wrapper.instance(), 'isSelected');

    wrapper.setState({ selectedMeals: [{ mealId: singleMeal.id }] });

    expect(wrapper.instance().isSelected('wrong')).toBe(false);
    expect(wrapper.instance().isSelected(singleMeal.id)).toBe(true);
    expect(isSelectedSpy).toHaveBeenCalled();
  });

  it('Should call afterOpenModal and set modal fields when modal pops up', () => {
    const afterOpenModalSpy = jest.spyOn(wrapper.instance(), 'afterOpenModal');

    wrapper.setState({ selectedMeals: [{ mealId: singleMeal.id }] });

    wrapper.instance().afterOpenModal();

    expect(wrapper.state().name).toBe(singleMenu.name);
    expect(wrapper.state().startDate).toBe(singleMenu.date);
    expect(afterOpenModalSpy).toHaveBeenCalled();
  });

  it('Should call handleSubmit and create a new menu successfully', () => {
    const createNewMenuSpy = jest.spyOn(wrapper.instance(), 'createNewMenu');

    wrapper.setState({ selectedMeals: [{ mealId: singleMeal.id }] });
    wrapper.setProps({
      state: { updateMode: false, meals: getMealsMock(5), currentMenu: singleMenu },
    });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    expect(createNewMenuSpy).toHaveBeenCalled();
  });

  it('Should call handleSubmit and update an existing menu successfully', () => {
    const updateExistingMenuSpy = jest.spyOn(wrapper.instance(), 'updateExistingMenu');

    wrapper.setState({ selectedMeals: [{ mealId: singleMeal.id }] });
    wrapper.setProps({
      state: { updateMode: true, meals: getMealsMock(5), currentMenu: singleMenu },
    });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    expect(updateExistingMenuSpy).toHaveBeenCalled();
  });

  it('Should call handleSubmit and throw validation errors', () => {
    wrapper.setState({
      selectedMeals: [], name: '', startDate: '', endDate: '',
    });
    wrapper.setProps({
      state: { updateMode: true, meals: getMealsMock(5), currentMenu: singleMenu },
    });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    expect(wrapper.state().errors).toEqual({
      selectedMeals: 'You must select at least one meal',
      startDate: 'The date field is required',
    });
  });
});
