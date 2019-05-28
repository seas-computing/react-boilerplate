import { createContext, Context, Reducer } from 'react';

/**
 * Possible types of message to display to the user
 */

export enum MessageType {
  error = 'error',
  success = 'success',
  info = 'info',
}

/**
 * Possible actions to take on the message queue
 */

export enum MessageActions {
  push = 'push',
  clear = 'clear',
}

/**
 * Fields for a message type.
 */

export interface Message {
  variant: MessageType;
  message: string;
}

/**
 * Used for displaying message to the client
 */

export class AppMessage implements Message {
  public variant: MessageType;

  public message: string;

  public constructor(newMessage: Message) {
    this.variant = newMessage.variant;
    this.message = newMessage.message;
  }
}

interface MessageState {
  queue: AppMessage[];
  currentMessage: AppMessage;
}

interface MessageAction {
  type: MessageActions;
  message?: AppMessage;
}
/**
 * handles Queueing logic for the toplevel app component
 */

export const messageReducer: Reducer<MessageState, MessageAction> = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  const { currentMessage, queue } = state;
  switch (action.type) {
    case (MessageActions.push): {
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
    case (MessageActions.clear): {
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


/**
 * Global message provider
 */

export const MessageContext: Context<Function> = createContext(null);
