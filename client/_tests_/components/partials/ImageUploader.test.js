import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocalStorageMock from '../../mocks/localStorage';
import ImageUploader from '../../../src/components/presentation/partials/ImageUploader';

const props = {
  putImage: jest.fn(),
  isShowingAddPhoto: false,
  toggleAddPhoto: jest.fn(),
};

axios.defaults.headers.common.Authorization = 'Bearer Hello';
const mock = new MockAdapter(axios);
const url = 'https://api.cloudinary.com/v1_1/onnassiz/image/upload';

const wrapper = shallow(<ImageUploader {...props} />);

global.localStorage = new LocalStorageMock();

describe('<ImageUploader />', () => {
  it('Should render Image Uploader component successfully', () => {
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should upload image successfully and return an image url', () => {
    const response = { secure_url: 'https://uploadedImage.jpeg' };
    localStorage.setItem('token', 'This is the token');

    mock.onPost(url).reply(200, response);

    const handleDropSpy = jest.spyOn(wrapper.instance(), 'handleDrop');

    wrapper.instance().handleDrop(['this is an image']).then((res) => {
      expect(res.data).toEqual(response);
      expect(wrapper.state().progress).toBe(0);
      expect(wrapper.state().showLoader).toBe(false);
      expect(handleDropSpy).toHaveBeenCalled();
    });
  });

  it('Should should return error if image upload fails', () => {
    const response = { message: 'An error occurred while uploading your image' };

    mock.onPost(url).reply(400, response);

    const handleDropSpy = jest.spyOn(wrapper.instance(), 'handleDrop');

    wrapper.instance().handleDrop(['this is an image']).then((err) => {
      expect(err.response.data).toEqual(response);
      expect(wrapper.state().errors).toEqual(response);
      expect(wrapper.state().showLoader).toBe(false);
      expect(handleDropSpy).toHaveBeenCalled();
    });
  });

  it('Should calculate upload progress when called', () => {
    const progress = { loaded: 3000, total: 5000 };

    const showProgressSpy = jest.spyOn(wrapper.instance(), 'showProgress');

    wrapper.instance().showProgress(progress);
    expect(wrapper.state().progress).toBe('60');
    expect(showProgressSpy).toHaveBeenCalled();
  });
});
