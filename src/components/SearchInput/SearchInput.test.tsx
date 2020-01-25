import React from 'react';
import { create, ReactTestRenderer } from 'react-test-renderer';

import SearchInput from './';

let snapshot: ReactTestRenderer;

beforeEach(() => {
  snapshot = create(<SearchInput value="" onChange={jest.fn()} />);
});

describe('<SearchInput />', () => {
  test('it matches the snapshot', () => {
    expect(snapshot.toJSON()).toMatchSnapshot();
  });
});
