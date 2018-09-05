import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MealsTableRow from '../../../src/components/presentation/partials/MealsTableRow';
import { singleMeal } from '../../objectProps/meals.props';

const props = {
  toggleAddPhoto: jest.fn(),
  toggleShowDeleteModal: jest.fn(),
  toggleUpdateModal: jest.fn(),
  item: singleMeal,
  key: singleMeal.id,
  i: 1,
};

const wrapper = shallow(<MealsTableRow {...props} />);

describe('<MealsTableRow />', () => {
  it('Should render table row component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should it should call function when update modal is clicked', () => {
    wrapper.find('#updateModal').simulate('click');
    wrapper.find('#addPhotoModal').simulate('click');
    wrapper.find('#deleteModal').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
