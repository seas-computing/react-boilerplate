import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AppContainer } from "react-hot-loader";
import App from "./js/components/App";
import reducer from "./js/reducers";

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

const appRender = Component => {
  render(
    <AppContainer warnings={false}>
      <Component store={store} />
    </AppContainer>,
    document.getElementById("root")
  );
};

appRender(App);

//handle hot reloading in development
if (module.hot) {
  module.hot.accept(["./js/components/App"], () => {
    console.log("Client changed. Reloading...");
    appRender(App);
  });
}
