import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../navbar';

describe('Navbar', () => {
  it('renders', () => {
    //스냅샷 테스트

    const component = renderer.create(<Navbar totalCount={4} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
