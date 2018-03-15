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

/** The primary app component
 * @class
 * @extends React.Component
 * @prop  {Object}  props
 * @prop  {String}  props.currentID  Id of the current user from the redux state
 * @prop  {Object}  props.store  the redux store object
 */
@connect(mapStateToProps, matchDispatchToProps)
export default class App extends Component {
  static propTypes = {
    currentId: PropTypes.string,
    store: PropTypes.object
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
   * Require the css and send an asynchronous request for the current user data
   * after the state is loaded
   * @member componentDidMount
   * @memberof App
   * @see module:client/actions/users.fetchCurrentUser
   */
  componentDidMount() {
    require("../../css/main.css");
    this.props.store.dispatch(fetchCurrentUser());
  }
}
