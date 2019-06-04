import React, {
  useState,
  useEffect,
  useReducer,
  ReactElement,
  SFC,
} from 'react';
import { hot } from 'react-hot-loader/root';
import { User } from 'server/models';
import { MESSAGE_TYPE, MESSAGE_ACTION, AppMessage } from 'client/classes';
import {
  MessageContext,
  messageReducer,
  UserContext,
} from 'client/context';
import { getCurrentUser } from 'client/api';
import { Message } from './layout';

/**
 * The primary app component. Fetches the current user from the server when it
 * mounts, then saves it to the UserContext to pass down to other components
 */

const ColdApp: SFC = (): ReactElement => {
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
          message: new AppMessage(`Current User: ${user.fullName}`),
          type: MESSAGE_ACTION.PUSH,
        });
      })
      .catch((): void => {
        dispatchMessage({
          message: new AppMessage(
            'Unable to get user data from server. If the problem persists, contact SEAS Computing',
            MESSAGE_TYPE.ERROR
          ),
          type: MESSAGE_ACTION.PUSH,
        });
      });
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={currentUser}>
        <MessageContext.Provider value={dispatchMessage}>
          <div className="app-content">
            <div>
              Your app is now loaded.
            </div>
            {currentMessage
              && (
                <Message
                  messageCount={queue.length}
                  messageText={currentMessage.text}
                  messageType={currentMessage.variant}
                />
              )}
          </div>
        </MessageContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export const App = hot(ColdApp);
