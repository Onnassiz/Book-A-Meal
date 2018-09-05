import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import MealsContainer from '../../../src/components/container/MealsContainer';
import profile from '../../objectProps/profile.props';

const mockStore = configureStore();

const store = mockStore({
  user: {},
  meals: {},
  profile,
  formState: { isLoading: false },
  postMeal: jest.fn(),
  updateMeal: jest.fn(),
  deleteMealById: jest.fn(),
  getMeals: jest.fn(),
  getProfile: jest.fn(),
});

const wrapper = mount(<MemoryRouter keyLength={0}><MealsContainer store={store} /></MemoryRouter>);

describe('<MealsContainer />', () => {
  it('Should render the Meals container successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
