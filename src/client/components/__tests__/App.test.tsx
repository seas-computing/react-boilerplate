import React from 'react';
import { strictEqual } from 'assert';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';

describe('App', function () {
  let wrapper: ShallowWrapper;
  beforeEach(function () {
    wrapper = shallow(<App />);
  });
  describe('rendering', function () {
    it('renders a component', function () {
      strictEqual(wrapper.exists(), true);
    });
  });
});
