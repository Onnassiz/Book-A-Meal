import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MealModal from '../../../src/components/presentation/partials/Meal/MealModal';
import { singleMeal } from '../../objectProps/meals.props';
import { updateMeal, postMeal } from '../../promiseProps/meals.props';

const props = {
  state: {
    updateMode: true,
    currentMeal: singleMeal,
    isShowingModal: true,
  },
  formState: { isLoading: false },
  meals: { errors: {} },
  handleAddButtonClick: jest.fn(),
  updateMeal,
  postMeal,
  addToMeals: jest.fn(),
  updateComponentMeals: jest.fn(),
};

const wrapper = shallow(<MealModal {...props} />);

describe('<MealTable />', () => {
  it('Should render meal modal component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call onChange method to update handle input change', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const firstEvent = {
      target: {
        name: 'name',
        value: 'Fried Rice',
      },
    };
    wrapper.instance().onChange(firstEvent);
    expect(wrapper.state().name).toBe('Fried Rice');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('Should call afterOpenModal method to update state for modal update', () => {
    const afterOpenModalSpy = jest.spyOn(wrapper.instance(), 'afterOpenModal');

    wrapper.instance().afterOpenModal();
    expect(wrapper.state().name).toBe('Malvaceae');
    expect(wrapper.state().category).toBe('dolor sit');
    expect(wrapper.state().price).toBe('400');
    expect(wrapper.state().description).toBe('Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.');
    expect(afterOpenModalSpy).toHaveBeenCalled();
  });

  it('Should call updateMeal method to update to updateMeal', () => {
    const updateMealSpy = jest.spyOn(wrapper.instance(), 'updateMeal');

    wrapper.instance().updateMeal(singleMeal).then(() => {
      expect(updateMealSpy).toHaveBeenCalled();
    });
  });

  it('Should call addMeal method to add meal to component', () => {
    const addMealSpy = jest.spyOn(wrapper.instance(), 'addMeal');

    wrapper.instance().addMeal(singleMeal).then(() => {
      expect(addMealSpy).toHaveBeenCalled();
    });
  });

  it('Should call handleSubmit method to submit a form with state', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const updateMealSpy = jest.spyOn(wrapper.instance(), 'updateMeal');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      name: 'The meal',
      price: '400',
      category: 'Dinner',
      description: 'The way up',
    });

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(updateMealSpy).toHaveBeenCalled();
  });

  it('Should call handleSubmit method and throw error when validation fails', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      name: '',
      price: '',
      category: '',
      description: '',
    });

    wrapper.instance().handleSubmit(event);

    expect(wrapper.state().errors.category).toBe('The category field is required');
    expect(wrapper.state().errors.name).toBe('The name field is required');
    expect(wrapper.state().errors.price).toBe('The price field is required');
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('Should call handleSubmit method and call addMeal when update mode is false', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const addMealSpy = jest.spyOn(wrapper.instance(), 'addMeal');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      name: 'The meal',
      price: '400',
      category: 'The Dinner',
      description: 'The way up',
    });

    wrapper.setProps({ state: { updateMode: false, currentMeal: singleMeal } });


    wrapper.instance().handleSubmit(event);

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(addMealSpy).toHaveBeenCalled();
  });
});
