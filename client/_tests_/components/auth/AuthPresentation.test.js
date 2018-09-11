import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Auth from '../../../src/components/presentation/Auth';

const props = {
  signInUser: jest.fn(),
  postUser: jest.fn(),
  history: {
    push: jest.fn(),
  },
  user: {},
  match: { params: { type: 'login' } },
  formState: { isLoading: false },
};

const wrapper = shallow(<Auth {...props} />);

props.match = { params: { type: 'register' } };
const registerWrapper = shallow(<Auth {...props} />);

jest.useFakeTimers();
describe('<Auth />', () => {
  it('Should render Auth presentation components successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render Auth presentation components successfully with signUp form', () => {
    expect(toJson(registerWrapper)).toMatchSnapshot();
  });

  it('Should call handle change method to update handle input change', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const firstEvent = {
      target: {
        name: 'fullName',
        value: 'Benjamin Onah',
      },
    };
    wrapper.instance().onChange(firstEvent);
    expect(wrapper.state().fullName).toBe('Benjamin Onah');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('Should set role to caterer when checkbox is clicked', () => {
    const event = {
      target: { value: 'caterer' },
    };
    registerWrapper.find('#signUpAsCaterer').simulate('change', event);
    expect(registerWrapper.state().checked).toBe(true);
    expect(registerWrapper.state().role).toBe('caterer');
  });

  it('Should set auth type to register when register button is clicked', () => {
    wrapper.find('#register').simulate('click');
    expect(wrapper.state().type).toBe('register');
  });

  it('Should set auth type to login when login button is clicked', () => {
    registerWrapper.find('#signIn').simulate('click');
    expect(registerWrapper.state().type).toBe('login');
  });

  it('Should trigger handleSubmit when register form is submitted', () => {
    const handleSubmitSpy = jest.spyOn(registerWrapper.instance(), 'handleSubmit');
    const postUserSpy = jest.spyOn(registerWrapper.instance().props, 'postUser');
    const event = {
      preventDefault: jest.fn(),
    };
    registerWrapper.setState({
      fullName: 'Ben Onah',
      password: 'password',
      confirm_password: 'password',
      signUpEmail: 'onnassiz@andela.com',
      role: 'customer',
    });
    registerWrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(postUserSpy).toHaveBeenCalledTimes(1);
  });

  it('Should not trigger postUser when register form is submitted with validation error', () => {
    const handleSubmitSpy = jest.spyOn(registerWrapper.instance(), 'handleSubmit');
    const postUserSpy = jest.spyOn(registerWrapper.instance().props, 'postUser');
    const event = {
      preventDefault: jest.fn(),
    };
    registerWrapper.setState({
      fullName: 'Ben Onah',
      password: 'password',
      confirm_password: 'password',
      signUpEmail: '',
      role: 'customer',
    });
    registerWrapper.instance().handleSubmit(event);
    expect(registerWrapper.state().signUpErrors.signUpEmail).toBe('The email field is required');
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(postUserSpy).toHaveBeenCalledTimes(1);
  });

  it('Should return errors when form validation fails on register', () => {
    const handleSubmitSpy = jest.spyOn(registerWrapper.instance(), 'handleSubmit');
    const postUserSpy = jest.spyOn(registerWrapper.instance().props, 'postUser');
    const event = {
      preventDefault: jest.fn(),
    };
    registerWrapper.setState({
      fullName: '',
      password: '',
      confirm_password: '',
      signUpEmail: '',
      role: '',
    });
    registerWrapper.instance().handleSubmit(event);
    expect(registerWrapper.state().signUpErrors.signUpEmail).toBe('The email field is required');
    expect(registerWrapper.state().signUpErrors.fullName).toBe('The full name field is required');
    expect(registerWrapper.state().signUpErrors.password).toBe('The password field is required');
    expect(registerWrapper.state().signUpErrors.confirm_password).toBe('The password confirmation field is required');
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(postUserSpy).toHaveBeenCalledTimes(1);
  });

  it('Should return errors when form validation fails on register', () => {
    const handleSubmitSpy = jest.spyOn(registerWrapper.instance(), 'handleSubmit');
    const postUserSpy = jest.spyOn(registerWrapper.instance().props, 'postUser');
    const event = {
      preventDefault: jest.fn(),
    };
    registerWrapper.setState({
      fullName: '',
      password: 'one-pass',
      confirm_password: 'pass',
      signUpEmail: '',
      role: '',
    });
    registerWrapper.instance().handleSubmit(event);
    expect(registerWrapper.state().signUpErrors.confirm_password).toBe('Password confirmation must match password');
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(postUserSpy).toHaveBeenCalledTimes(1);
  });

  it('Should trigger handleSubmit when login form is submitted', () => {
    const handleSignInSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSignInSubmit');
    const signInUserSpy = jest.spyOn(wrapper.instance().props, 'signInUser');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      signInPassword: 'password-1',
      signInEmail: 'onnassiz@andela.com',
    });
    wrapper.instance().handleSignInSubmit(event);
    expect(handleSignInSubmitSpy).toHaveBeenCalled();
    expect(signInUserSpy).toHaveBeenCalledTimes(1);
  });

  it('Should not trigger postUser when login form is submitted with validation error', () => {
    const handleSignInSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSignInSubmit');
    const signInUserSpy = jest.spyOn(wrapper.instance().props, 'signInUser');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      signInPassword: '',
      signInEmail: '',
    });
    wrapper.instance().handleSignInSubmit(event);
    expect(wrapper.state().signInErrors.signInEmail).toBe('The email field is required');
    expect(wrapper.state().signInErrors.signInPassword).toBe('The password field is required');
    expect(handleSignInSubmitSpy).toHaveBeenCalled();
    expect(signInUserSpy).toHaveBeenCalledTimes(1);
  });
});
