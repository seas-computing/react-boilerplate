import { createContext, Context, Reducer } from 'react';
import { AppMessage, MessageAction } from '../classes';
/**
 * Global message provider
 */

export const MessageContext: Context<Function> = createContext(null);

/**
 * handles queueing logic for the top-level app component
 */

/**
 * Defines the state of the message reducer
 */

export interface MessageReducerState {
  queue: AppMessage[];
  currentMessage: AppMessage;
}

/**
 * Defines that kinds of actions that can be accepted by the reducer
 */

export interface MessageReducerAction {
  type: MessageAction;
  message?: AppMessage;
}


export const messageReducer:
Reducer<MessageReducerState, MessageReducerAction> = (
  state,
  action
): MessageReducerState => {
  const { currentMessage, queue } = state;
  switch (action.type) {
    case (MessageAction.push): {
      if (!currentMessage) {
        return ({
          ...state,
          currentMessage: action.message,
        });
      }
      const newQueue = [...queue, action.message];
      return {
        ...state,
        queue: newQueue,
      };
    }
    case (MessageAction.clear): {
      const nextQueue = [...queue];
      const nextMessage = nextQueue.shift();
      return {
        queue: nextQueue,
        currentMessage: nextMessage,
      };
    }
    default:
      return state;
  }
};
