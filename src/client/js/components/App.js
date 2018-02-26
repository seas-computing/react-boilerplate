import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { fetchCurrentUser } from "../actions";
import { Message } from "./layout/Message";

const mapStateToProps = state => ({
  currentId: state.users.currentUser.id
});

const mapDispatchToProps = dispatch => dispatch;

@connect(mapStateToProps, mapDispatchToProps())
export default class App extends Component {
  render() {
    const { adminOpen, year } = this.props;
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <content>
            <div>Your app is loaded.</div>
            <div>Current User id is {currentId}</div>
          </content>
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    require("../../css/main.css");
    this.props.dispatch(fetchCurrentUser());
  }
}
