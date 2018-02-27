import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { fetchCurrentUser } from "../actions";

const mapStateToProps = state => ({
  currentId: state.users.currentUser.id
});

const matchDispatchToProps = dispatch => ({
  dispatch
});

@connect(mapStateToProps, matchDispatchToProps)
export default class App extends Component {
  render() {
    const { currentId } = this.props;
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <content>
            <div>Your app is now loaded.</div>
          </content>
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    require("../../css/main.css");
    console.log(this.props);
    this.props.store.dispatch(fetchCurrentUser());
  }
}
