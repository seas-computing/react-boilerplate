import React, {
  useState,
  useEffect,
  useReducer,
  ReactElement,
  SFC,
} from 'react';
import { hot } from 'react-hot-loader/root';
import {
  AppMessage,
  MessageActions,
  MessageContext,
  MessageType,
  messageReducer,
  UserContext,
} from '../context';
import { User } from '../../server/models';
import { getCurrentUser } from '../api';
import { Message } from './layout';

/**
 * The primary app component. Fetches the current user from the server when it
 * mounts, then saves it to the UserContext to pass down to other components
 */

const App: SFC = (): ReactElement => {
  /**
   * Hook for maintaining the currently selected user
   * */

  const [currentUser, setUser] = useState();

  /**
   * Set up the local reducer for maintaining the current app-wide message
   * queue. The dispatchMessage function will be passed down through the
   * Message Context Provider
   * */

  const [{ currentMessage, queue }, dispatchMessage] = useReducer(
    messageReducer,
    {
      queue: [],
      currentMessage: undefined,
    }
  );

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
        dispatchMessage({
          message: new AppMessage({
            variant: MessageType.info,
            message: `Current User: ${user.fullName}`,
          }),
          type: MessageActions.push,
        });
      })
      .catch((): void => {
        dispatchMessage({
          message: new AppMessage({
            variant: MessageType.error,
            message: 'Unable to get userdata from server. If the problem persists, contact SEAS Computing',
          }),
          type: MessageActions.push,
        });
      });
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={currentUser}>
        <MessageContext.Provider value={dispatchMessage}>
          <div>
            <div>Your app is now loaded.</div>
          </div>
          {currentMessage
            && (
              <Message
                messageCount={queue.length}
                messageText={currentMessage.message}
                messageType={currentMessage.variant}
              />
            )}
        </MessageContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default hot(App);
