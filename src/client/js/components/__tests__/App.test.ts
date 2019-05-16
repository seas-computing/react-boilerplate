import React from 'react';
import { strictEqual } from 'assert';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = shallow(<App />);
  });
  describe('rendering', function () {
    it('renders a component', function () {
      strictEqual(wrapper.exists(), true);
    });
  });
});
