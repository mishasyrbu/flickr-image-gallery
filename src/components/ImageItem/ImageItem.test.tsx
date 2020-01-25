import React from 'react';
import { create, ReactTestRenderer } from 'react-test-renderer';

import ImageItem from './';

let snapshot: ReactTestRenderer;

beforeEach(() => {
  snapshot = create(<ImageItem src="" />);
});

describe('<ImageItem />', () => {
  test('it matches the snapshot', () => {
    expect(snapshot.toJSON()).toMatchSnapshot();
  });
});
