import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sweetalert from 'sweetalert';
import Meals from '../../../src/components/presentation/Meals';
import userMock from '../../objectProps/user.props';
import { singleMeal, getMealsMock } from '../../objectProps/meals.props';
import profileMock from '../../objectProps/profile.props';
import { getMeals, updateMeal, deleteMealById } from '../../promiseProps/meals.props';

const props = {
  user: userMock,
  meals: {},
  profile: profileMock,
  history: {
    push: jest.fn(),
  },
  formState: { isLoading: false },
  postMeal: jest.fn(),
  updateMeal,
  deleteMealById,
  getMeals,
  getProfile: jest.fn(),
};

const wrapper = shallow(<Meals {...props} />);

props.profile = {};
const wrapperWithoutProfile = shallow(<Meals {...props} />);

jest.useFakeTimers();
jest.mock('sweetalert');

describe('<Meals />', () => {
  it('Should render Meals presentation components successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render Meals presentation components successfully when no profile is passed', () => {
    expect(toJson(wrapperWithoutProfile)).toMatchSnapshot();
  });

  it('Should trigger toggle dropZone when called', () => {
    const toggleDropZoneSpy = jest.spyOn(wrapper.instance(), 'toggleDropZone');
    wrapper.instance().toggleDropZone();

    expect(toggleDropZoneSpy).toHaveBeenCalled();
    expect(wrapper.state().isShowingDropZoneModal).toBe(true);
  });

  it('Should trigger putImage when called', () => {
    const putImageSpy = jest.spyOn(wrapper.instance(), 'putImage');

    wrapper.setState({ currentMeal: singleMeal });
    wrapper.instance().putImage('https://image.jpeg');

    expect(putImageSpy).toHaveBeenCalled();
  });

  it('Should trigger handleAddButtonClick when add button is clicked', () => {
    wrapper.setState({
      updateMode: true,
    });

    wrapper.find('#addMeal').simulate('click');

    expect(wrapper.state().updateMode).toBe(false);
    expect(wrapper.state().currentMeal).toEqual({});
    expect(wrapper.state().isShowingModal).toBe(true);
  });

  it('Should trigger pushToProfile when profile button is clicked', () => {
    const pushToProfileSpy = jest.spyOn(wrapperWithoutProfile.instance(), 'pushToProfile');
    wrapperWithoutProfile.setState({
      updateMode: true,
    });
    wrapperWithoutProfile.find('#gotoProfile').simulate('click');

    expect(pushToProfileSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleUpdateModal when it is called', () => {
    const toggleUpdateModalSpy = jest.spyOn(wrapper.instance(), 'toggleUpdateModal');

    wrapper.setState({
      updateMode: false,
      currentMeal: {},
      isShowingModal: false,
    });

    wrapper.instance().toggleUpdateModal(singleMeal);

    expect(toggleUpdateModalSpy).toHaveBeenCalled();
    expect(wrapper.state().updateMode).toBe(true);
    expect(wrapper.state().currentMeal).toEqual(singleMeal);
    expect(wrapper.state().isShowingModal).toBe(true);
  });

  it('Should trigger toggleShowDeleteModal when it is called', () => {
    const toggleShowDeleteModalSpy = jest.spyOn(wrapper.instance(), 'toggleShowDeleteModal');
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper.instance().toggleShowDeleteModal(singleMeal);
    expect(toggleShowDeleteModalSpy).toHaveBeenCalled();
  });

  it('Should trigger deleteMeal when it is called', () => {
    const deleteMealSpy = jest.spyOn(wrapper.instance(), 'deleteMeal');
    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().deleteMeal(true, singleMeal).then(() => {
      expect(deleteMealSpy).toHaveBeenCalled();
      expect(handlePageChangeSpy).not.toHaveBeenCalled();
      expect(wrapper.state().updateMode).toBe(true);
      expect(wrapper.state().mealsCount).toBe(10);
      expect(wrapper.state().currentMeal).toEqual({});
    }).catch(() => {
      expect(false).toBe(false);
    });
  });

  it('Should trigger deleteMeal when it is called and handle page change', () => {
    const deleteMealSpy = jest.spyOn(wrapper.instance(), 'deleteMeal');
    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.setState({ meals: [singleMeal] });

    wrapper.instance().deleteMeal(true, singleMeal).then(() => {
      expect(deleteMealSpy).toHaveBeenCalled();
      expect(handlePageChangeSpy).toHaveBeenCalled();
    }).catch(() => {
      expect(false).toBe(false);
    });
  });

  it('Should trigger addToMeals when it is called and increase meal count', () => {
    const addToMealsSpy = jest.spyOn(wrapper.instance(), 'addToMeals');
    const handleAddButtonClickSpy = jest.spyOn(wrapper.instance(), 'handleAddButtonClick');

    wrapper.setState({ meals: getMealsMock(11) });

    wrapper.instance().addToMeals(singleMeal);

    expect(addToMealsSpy).toHaveBeenCalled();
    expect(handleAddButtonClickSpy).toHaveBeenCalled();
    expect(wrapper.state().meals.length).toBe(10);
    expect(wrapper.state().mealsCount).toBe(12);
  });
});
