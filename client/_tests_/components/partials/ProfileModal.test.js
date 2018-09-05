import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfileModal from '../../../src/components/presentation/partials/Profile/ProfileModal';
import profile from '../../objectProps/profile.props';

const state = profile;
profile.errors = {};

const props = {
  state,
  profile,
  handleSubmit: jest.fn(),
  onChange: jest.fn(),
  formState: { isLoading: true },
  handleAddButtonClick: jest.fn(),
};

const wrapper = shallow(<ProfileModal {...props} />);

describe('<ProfileModal />', () => {
  it('Should render Profile Modal component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
