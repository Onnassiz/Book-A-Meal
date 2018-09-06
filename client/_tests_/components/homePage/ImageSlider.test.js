import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ImageSlider from '../../../src/components/presentation/partials/ImageSlider';

const wrapper = shallow(<ImageSlider />);

describe('<ImageSlider />', () => {
  it('Render User Home Page Image Slider component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
