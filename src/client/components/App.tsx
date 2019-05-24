import React, { useState, useEffect, ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  UserContext, MessageContext, MessageType, AppMessage,
} from '../context';
import { User } from '../../server/models';
import { getCurrentUser } from '../api';
import { Message } from './layout';

/**
 * The primary app component. Fetches the current user from the server when it
 * mounts, then saves it to the UserContext to pass down to other components
 */

const App = (): ReactElement => {
  /**
   * Hook for maintaining the currently selected user
   * */

  const [currentUser, setUser] = useState();

  /**
   * Hook for maintaining the current app-wide message
   * */

  const [appMessage, setMessage] = useState(new AppMessage({
    message: '',
    variant: null,
  }));

  /**
   * Get the currently authenticated user from the server on launch.
   * If it fails, display a message for the user
   */

  useEffect((): void => {
    getCurrentUser()
      .then(({ data: user }): User => {
        setUser(user);
        return user;
      })
      .then((user): void => {
        setMessage(new AppMessage({
          variant: MessageType.info,
          message: `Current User: ${user.fullName}`,
          setMessage,
        }));
      })
      .catch((): void => {
        setMessage(new AppMessage({
          variant: MessageType.error,
          message: 'Unable to get userdata from server. If the problem persists, contact SEAS Computing',
          setMessage,
        }));
      });
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={currentUser}>
        <MessageContext.Provider value={appMessage}>
          <div>
            <div>Your app is now loaded.</div>
          </div>
          <Message />
        </MessageContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default hot(App);
