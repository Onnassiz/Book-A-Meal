import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Profile from '../../../src/components/presentation/Profile';
import user from '../../objectProps/user.props';
import profile from '../../objectProps/profile.props';
import { postProfile, updateProfile } from '../../promiseProps/profile.props';

user.role = 'customer';
const props = {
  user,
  history: { push: jest.fn() },
  profile: {},
  formState: {},
  postProfile,
  updateProfile,
  getProfile: jest.fn(),
  putImage: updateProfile,
};

const wrapper = shallow(<Profile {...props} />);

describe('<Profile />', () => {
  it('Should render Profile page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call onChange method to update handle input change', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const firstEvent = {
      target: {
        name: 'businessName',
        value: 'Sweet Summer',
      },
    };
    wrapper.instance().onChange(firstEvent);
    expect(wrapper.state().businessName).toBe('Sweet Summer');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('Should trigger handleSubmit method when it is called and call createProfile', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const createProfileSpy = jest.spyOn(wrapper.instance(), 'createProfile');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState(profile);

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(createProfileSpy).toHaveBeenCalled();
  });

  it('Should call toggleDropZone when button is clicked', () => {
    wrapper.find('#toggleDropZone').simulate('click');
    expect(wrapper.state().isShowingDropZoneModal).toBe(true);
  });

  it('Should trigger handleSubmit method when it is called and call updateProfile', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const updateProfileSpy = jest.spyOn(wrapper.instance(), 'updateProfile');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState(profile);

    wrapper.setProps({ profile });

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(updateProfileSpy).toHaveBeenCalled();
  });

  it('Should trigger handleSubmit method and throw error when validation fails', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      businessName: '',
      mission: '',
      contact: '',
      email: '',
      banner: '',
    });

    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors.businessName).toBe('The business name field is required');
    expect(wrapper.state().errors.mission).toBe('The mission field is required');
    expect(wrapper.state().errors.email).toBe('The email field is required');
    expect(wrapper.state().errors.contact).toBe('The contact field is required');
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('Should trigger handleAddButtonClick method when it is called', () => {
    const handleAddButtonClickSpy = jest.spyOn(wrapper.instance(), 'handleAddButtonClick');

    wrapper.instance().handleAddButtonClick(true);
    expect(handleAddButtonClickSpy).toHaveBeenCalled();
  });

  it('Should trigger putImage method when it is called', () => {
    const putImageSpy = jest.spyOn(wrapper.instance(), 'putImage');

    profile.businessName = 'Waiters Splash';
    wrapper.setState(profile);

    wrapper.instance().putImage().then(() => {
      expect(putImageSpy).toHaveBeenCalled();
      expect(wrapper.state().isShowingDropZoneModal).toBe(false);
    });
  });
});
