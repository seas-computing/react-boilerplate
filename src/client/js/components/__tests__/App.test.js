import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import { expect } from "chai";
import configureStore from "redux-mock-store";
import App from "../App.js";
import * as dummy from "../../../../../common/__tests__/data";

describe("App", function() {
  let wrapper;
  let unwrapped;
  let store;
  beforeEach(function() {
    store = configureStore()({});
    wrapper = shallow(
      <Provider store={store}>
        <People {...props} />
      </Provider>
    );
    unwrapped = shallow(<People.WrappedComponent {...props} />);
  });
  describe("rendering", function() {
    it("Should render HOC correctly", function() {
      expect(toJson(wrapper)).to.matchSnapshot();
    });
    it("should render unwrapped component correctly", function() {
      expect(toJson(unwrapped)).to.matchSnapshot();
    });
  });
});
