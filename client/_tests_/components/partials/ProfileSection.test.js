import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfileSection from '../../../src/components/presentation/partials/Profile/ProfileSection';
import profile from '../../objectProps/profile.props';

const props = {
  profile,
};

const wrapper = shallow(<ProfileSection {...props} />);

describe('<ProfileSection />', () => {
  it('Should render ProfileSection  component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
