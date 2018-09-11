import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pagination from 'react-js-pagination';
import SlidingPane from 'react-sliding-pane';
import Calendar from 'rc-calendar';
import Card from './../../../src/components/presentation/partials/MealCard';
import Menus from '../../../src/components/presentation/Menus';
import user from '../../objectProps/user.props';
import * as menusHelpers from '../../../src/utilities/menusHelpers';
import { getMeals } from '../../promiseProps/meals.props';
import { singleMeal, getMealsMock } from '../../objectProps/meals.props';

const props = {
  formState: { isLoading: false },
  menus: { currentDate: '2018-09-09' },
  user,
  cart: {
    cart: getMealsMock(1),
    owner: '',
    orderId: '',
    address: '',
    contact: '',
    isOpen: false,
    totalPrice: 0,
    updateMode: false,
  },
  getMealsInDailyMenu: getMeals,
  addToCart: jest.fn(),
  deleteFromCart: jest.fn(),
};

const wrapper = shallow(<Menus {...props} />);

describe('<Menus />', () => {
  it('Should render the Menus container successfully', () => {
    wrapper.setState({ meals: getMealsMock(1) });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call onChange method to update handle date change', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const firstEvent = {
      target: {
        name: 'date',
        value: '2019-12-12',
      },
    };
    wrapper.instance().onChange(firstEvent).then(() => {
      expect(wrapper.state().date).toBe('2019-12-12');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });

  it('Should trigger showMore to show more information about a meal cart in a modal', () => {
    const showMoreSpy = jest.spyOn(wrapper.instance(), 'showMore');
    wrapper.instance().showMore(singleMeal);
    expect(showMoreSpy).toHaveBeenCalled();
  });

  it('Should show fixed calendar when button is clicked', () => {
    wrapper.find('.ion-ios-calendar-outline').simulate('click');
    expect(wrapper.state().isPaneOpenLeft).toBe(true);
  });

  it('Should trigger remove item from cart when remove button is clicked', () => {
    const removeFromCart = jest.spyOn(wrapper.instance(), 'removeFromCart');
    wrapper
      .find(Card)
      .first()
      .dive()
      .find('.add_button')
      .simulate('click');

    expect(removeFromCart).toHaveBeenCalled();
  });

  it('Should trigger showMore function when more-button button is clicked', () => {
    const showMoreSpy = jest.spyOn(wrapper.instance(), 'showMore');
    wrapper
      .find(Card)
      .first()
      .dive()
      .find('.more-button')
      .simulate('click');

    expect(showMoreSpy).toHaveBeenCalled();
  });

  it('Should trigger add item to cart when add button is clicked', () => {
    const addToCartSpy = jest.spyOn(wrapper.instance(), 'addToCart');
    wrapper.setProps({
      cart: {
        cart: [],
        owner: '',
        orderId: '',
        address: '',
        contact: '',
        isOpen: false,
        totalPrice: 0,
        updateMode: false,
      },
    });

    wrapper
      .find(Card)
      .first()
      .dive()
      .find('.add_button')
      .simulate('click');

    expect(addToCartSpy).toHaveBeenCalled();
  });

  it('Should render pagination when mealsCount is more than 12', () => {
    const renderPaginationSpy = jest.spyOn(wrapper.instance(), 'renderPagination');
    wrapper.setState({ mealsCount: 13 });

    expect(wrapper.find(Pagination).length).toBe(1);
    expect(renderPaginationSpy).toHaveBeenCalled();
  });

  it('Should call handlePageChange when pagination button is clicked', () => {
    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.find(Pagination).first().find('a').simulate('change');
    expect(handlePageChangeSpy).toHaveBeenCalled();
  });

  it('Should call handleDateChange when calendar date button is clicked', () => {
    const handleDateChangeSpy = jest.spyOn(wrapper.instance(), 'handleDateChange');

    wrapper.find(Calendar).simulate('change');
    expect(handleDateChangeSpy).toHaveBeenCalled();
  });

  it('Should set isPaneOpenLeft to false when slide-pane__close is clicked', () => {
    const handleDateChangeSpy = jest.spyOn(wrapper.instance(), 'handleDateChange');

    wrapper.find(SlidingPane).simulate('requestClose');
    expect(handleDateChangeSpy).toHaveBeenCalled();
  });

  it('Should change date when next or prev buttons are clicked', () => {
    const getMenuForDateSpy = jest.spyOn(menusHelpers, 'getMenuForDate');

    wrapper.find('.dateInput').find('a').first().simulate('click');
    wrapper.find('.dateInput').find('a').last().simulate('click');
    expect(getMenuForDateSpy).toHaveBeenCalledTimes(2);
  });
});
