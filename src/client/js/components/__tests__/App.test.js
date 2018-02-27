import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import { expect } from "chai";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../App.js";
import * as dummy from "../../../../common/__tests__/data/index";

describe("App", function() {
  let props;
  let wrapper;
  let unwrapped;
  let store;
  const middleware = [thunk];
  beforeEach(function() {
    store = configureStore(middleware)({});
    props = {
      currentId: "88888888",
      store: store
    };
    wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
    unwrapped = shallow(<App.WrappedComponent {...props} />);
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
