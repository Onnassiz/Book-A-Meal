import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BasicInput, TextArea, Checkbox } from '../../../src/components/presentation/form/BasicInput';

const props = {
  name: 'Ben',
  label: 'Name',
  min: '100',
  type: 'text',
  value: 'Ben',
  onChange: jest.fn(),
  hasError: true,
  meal: { id: '123', name: 'Fried Rice' },
  isChecked: true,
};

const wrapper = shallow(<BasicInput {...props} />);
const textAreaWrapper = shallow(<TextArea {...props} />);

props.type = 'checkbox';

const checkBoxWrapper = shallow(<Checkbox {...props} />);

describe('<ShowErrors />', () => {
  it('Should render basic input component successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render textarea component successfully', () => {
    expect(toJson(textAreaWrapper)).toMatchSnapshot();
  });

  it('Should render checkbox component successfully', () => {
    expect(toJson(checkBoxWrapper)).toMatchSnapshot();
  });
});
