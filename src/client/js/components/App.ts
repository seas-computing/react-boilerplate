import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

/** The primary app component
 * @class
 * @extends React.Component
 * @prop  {Object}  props
 * @prop  {String}  props.currentID  Id of the current user from the redux state
 * @prop  {Object}  props.store  the redux store object
 */
class App extends Component {
  render() {
    return (
      <div className="app">
        <content>
          <div>Your app is now loaded.</div>
        </content>
      </div>
    );
  }
}

export default hot(App);
