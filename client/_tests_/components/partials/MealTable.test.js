import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MealTable from '../../../src/components/presentation/partials/Meal/MealTable';
import { getMealsMock } from '../../objectProps/meals.props';

const props = {
  state: {
    meals: getMealsMock(10),
  },
  toggleAddPhoto: jest.fn(),
  toggleShowDeleteModal: jest.fn(),
  toggleUpdateModal: jest.fn(),
};

const wrapper = shallow(<MealTable {...props} />);

describe('<MealTable />', () => {
  it('Should render table  component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
