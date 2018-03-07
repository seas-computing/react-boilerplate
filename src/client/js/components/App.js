/**
 * Top Level App Component
 * @module client/components/App
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, Provider } from "react-redux";
import { fetchCurrentUser } from "../actions";

const mapStateToProps = state => ({
  currentId: state.users.currentUser.id
});

const matchDispatchToProps = dispatch => ({
  dispatch
});

/**
 * The primary app component
 * @type Component
 * @function App
 * @memberof  module:client/components/App
 * @param  {Object}  props
 * @param  {String}  props.currentID  Id of the current user from the redux state
 * @param  {Object}  props.store  the redux store object
 */

@connect(mapStateToProps, matchDispatchToProps)
export default class App extends Component {
  static PropTypes = {
    currentId: PropTypes.string,
    store: PropTypes.obj
  };
  render() {
    const { currentId, store } = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <content>
            <div>Your app is now loaded.</div>
          </content>
        </div>
      </Provider>
    );
  }

  /**
   * Make asynchronous request after the state is loaded
   * @inner componentDidMount
   * @memberof  module:client/components/App
   */
  componentDidMount() {
    require("../../css/main.css");
    this.props.store.dispatch(fetchCurrentUser());
  }
}
