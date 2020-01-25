import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { create, ReactTestRenderer } from 'react-test-renderer';

import ImageGallery, { ImageGalleryState, ImageGalleryProps } from './';

let wrapper: ReactWrapper<ImageGalleryProps, ImageGalleryState>;
let snapshot: ReactTestRenderer;

beforeEach(() => {
    jest.mock('../services', () => ({
        loadPhotosApi: jest.fn(),
    }));

    const imageGallery = <ImageGallery />;

    wrapper = mount(imageGallery);
    snapshot = create(imageGallery);
});

describe('<ImageGallery />', () => {
  test('it matches the snapshot', () => {
    expect(snapshot.toJSON()).toMatchSnapshot();
  });

  it('it should load photos on search query change event', () => {
    const spyLoadPhotos = jest.spyOn(wrapper.instance() as ImageGallery, 'loadPhotos');
    wrapper.update();
    wrapper.find('.search-input').simulate('change');

    expect(spyLoadPhotos).toHaveBeenCalled();
  });

  it('it should handle on scroll event', () => {
    const componentInstance = wrapper.instance() as ImageGallery;
    const spyOnScrollList = jest.spyOn(componentInstance, 'onScrollList');
    wrapper.update();
    wrapper.find('.image-list').simulate('scroll');

    expect(spyOnScrollList).toHaveBeenCalled();
  });

  it('it should update state on search query change event', () => {
    const componentInstance = wrapper.instance() as ImageGallery;
    const spyLoadPhotos = jest.spyOn(componentInstance, 'loadPhotos');

    componentInstance.handleSearchChange('test');

    expect(wrapper.state('searchQuery')).toBe('test');
    expect(wrapper.state('page')).toBe(1);
    expect(wrapper.state('loading')).toBe(true);
    expect(spyLoadPhotos.mock.calls.length).toBe(1);
  });
});
