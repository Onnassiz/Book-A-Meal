import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuAccordion from '../../../src/components/presentation/partials/MenuAccordion';
import { singleMenu } from '../../objectProps/menus.props';
import { getMealsInMenu } from '../../promiseProps/menus.props';


const props = {
  menu: singleMenu,
  toggleUpdateModal: jest.fn(),
  toggleShowDeleteModal: jest.fn(),
  showOpsButtons: true,
  getMealsInMenu,
};

const wrapper = shallow(<MenuAccordion {...props} />);

describe('<MenuAccordion />', () => {
  it('Should render MenuAccordion  component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call handlePageChange and change current page to new page', () => {
    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().handlePageChange(3).then(() => {
      expect(wrapper.state().activePage).toBe(3);
      expect(handlePageChangeSpy).toHaveBeenCalled();
    });
  });

  it('Should call showMeals and display meals when show meals button is clicked', () => {
    const showMealsSpy = jest.spyOn(wrapper.instance(), 'showMeals');

    wrapper.instance().showMeals().then(() => {
      expect(wrapper.state().activePage).toBe(1);
      expect(showMealsSpy).toHaveBeenCalled();
    });
  });
});
