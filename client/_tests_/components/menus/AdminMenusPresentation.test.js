import React from 'react';
import { shallow } from 'enzyme';
import sweetalert from 'sweetalert';
import Pagination from 'react-js-pagination';
import toJson from 'enzyme-to-json';
import AdminMenus from '../../../src/components/presentation/AdminMenus';
import user from '../../objectProps/user.props';
import profile from '../../objectProps/profile.props';
import { postMenu, getMenus, updateMenu, getMealsInMenu, deleteMenuById } from '../../promiseProps/menus.props';
import { getMeals } from '../../promiseProps/meals.props';
import { getProfile } from '../../promiseProps/profile.props';
import { singleMenu } from '../../objectProps/menus.props';
import MenuAccordion from '../../../src/components/presentation/partials/MenuAccordion';

user.role = 'customer';
const props = {
  user,
  menus: { error: {} },
  history: { push: jest.fn() },
  profile,
  formState: { isLoading: false },
  getProfile,
  getMeals,
  postMenu,
  getUserMenus: getMenus,
  updateMenu,
  getMealsInMenu,
  deleteMenuById,
};

const wrapper = shallow(<AdminMenus {...props} />);

props.profile = {};

const wrapperWithoutProfile = shallow(<AdminMenus {...props} />);

jest.useFakeTimers();
jest.mock('sweetalert');
describe('<AdminMenus />', () => {
  it('Should render Admin Menu presentation component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render Admin Menu presentation component successfully when caterer profile is empty', () => {
    expect(toJson(wrapperWithoutProfile)).toMatchSnapshot();
  });

  it('Should trigger pushToProfile page if caterer does not have a profile and button is clicked', () => {
    const pushToProfileSpy = jest.spyOn(wrapperWithoutProfile.instance(), 'pushToProfile');

    wrapperWithoutProfile.setState({
      menusCount: 0,
    });

    wrapperWithoutProfile.find('#setupProfile').simulate('click');

    expect(pushToProfileSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleShowModal and update states when button is clicked and isShowingModal is true', () => {
    const toggleShowModalSpy = jest.spyOn(wrapper.instance(), 'toggleShowModal');

    wrapper.setState({ isShowingModal: true });

    wrapper.find('#showModal').simulate('click');

    expect(wrapper.state().isShowingModal).toBe(false);
    expect(wrapper.state().updateMode).toBe(false);
    expect(wrapper.state().mealsActivePage).toBe(1);
    expect(toggleShowModalSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleShowModal and update states when showModal button is clicked and isShowingModal is false', () => {
    const toggleShowModalSpy = jest.spyOn(wrapper.instance(), 'toggleShowModal');

    wrapper.setState({ isShowingModal: false });

    wrapper.instance().toggleShowModal().then(() => {
      expect(wrapper.state().isShowingModal).toBe(true);
      expect(wrapper.state().mealsCount).toBe(11);
      expect(toggleShowModalSpy).toHaveBeenCalled();
    });
  });

  it('Should trigger handlePageChange when it is called and update page number', () => {
    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().handlePageChange(4).then(() => {
      expect(wrapper.state().mealsCount).toBe(11);
      expect(wrapper.state().mealsActivePage).toBe(4);
      expect(handlePageChangeSpy).toHaveBeenCalled();
    });
  });

  it('Should trigger handMenuPageChange when it is called and update page number', () => {
    const handMenuPageChangeSpy = jest.spyOn(wrapper.instance(), 'handMenuPageChange');

    wrapper.instance().handMenuPageChange(4).then(() => {
      expect(wrapper.state().activePage).toBe(4);
      expect(handMenuPageChangeSpy).toHaveBeenCalled();
    });
  });

  it('Should trigger toggleUpdateModal when it is called and update component state for menu update', () => {
    const toggleUpdateModalSpy = jest.spyOn(wrapper.instance(), 'toggleUpdateModal');

    wrapper.setProps({ getMealsInMenu });

    wrapper.instance().toggleUpdateModal(singleMenu).then(() => {
      expect(wrapper.state().meals.length).toBe(11);
      expect(wrapper.state().isShowingModal).toBe(true);
      expect(wrapper.state().updateMode).toBe(true);
      expect(wrapper.state().currentMenu).toBe(singleMenu);
      expect(toggleUpdateModalSpy).toHaveBeenCalled();
    });
  });

  it('Should trigger addToViewMenus when it is called and update component state with new menu', () => {
    const addToViewMenusSpy = jest.spyOn(wrapper.instance(), 'addToViewMenus');

    wrapper.instance().addToViewMenus([singleMenu]);

    expect(wrapper.state().menuCount).toBe(12);
    expect(addToViewMenusSpy).toHaveBeenCalled();
  });

  it('Should trigger updateViewMenus when it is called and update component state with new menu', () => {
    const updateViewMenusSpy = jest.spyOn(wrapper.instance(), 'updateViewMenus');

    wrapper.instance().updateViewMenus(singleMenu);
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
    expect(wrapper.state().thisPageMenus);

    expect(updateViewMenusSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleShowDeleteModal when it is called', () => {
    const toggleShowDeleteModalSpy = jest.spyOn(wrapper.instance(), 'toggleShowDeleteModal');
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper.instance().toggleShowDeleteModal(singleMenu);
    expect(toggleShowDeleteModalSpy).toHaveBeenCalled();
  });

  it('Should trigger handMenuPageChange page number button is clicked', () => {
    const handMenuPageChangeSpy = jest.spyOn(wrapper.instance(), 'handMenuPageChange');

    wrapper.setState({ menuCount: 14 });

    wrapper.find(Pagination).first().simulate('change', 4);

    expect(handMenuPageChangeSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleUpdateModal when called', () => {
    const toggleUpdateModalSpy = jest.spyOn(wrapper.instance(), 'toggleUpdateModal');

    wrapper.find(MenuAccordion).first().dive().find('#show-update')
      .simulate('click');

    expect(toggleUpdateModalSpy).toHaveBeenCalled();
  });

  it('Should trigger toggleShowDeleteModal when called', () => {
    const toggleShowDeleteModalSpy = jest.spyOn(wrapper.instance(), 'toggleShowDeleteModal');

    wrapper.find(MenuAccordion).first().dive().find('#show-delete')
      .simulate('click');

    expect(toggleShowDeleteModalSpy).toHaveBeenCalled();
  });
});
