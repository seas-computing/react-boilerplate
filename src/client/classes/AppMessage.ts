import { Reducer } from 'react';

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

export enum MessageAction {
  push = 'push',
  clear = 'clear',
}

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

/**
 * Used for displaying messages on the client
 */

export class AppMessage {
  public readonly variant: MessageType;

  public readonly text: string;

  public static Type = MessageType;

  public static Action = MessageAction;

  /**
   * Create a new application message. By default, sets the message priority to
   * "info", but alternativae values can be passed in as the second parameter.
   */

  public constructor(
    message: string,
    variant: MessageType = MessageType.info
  ) {
    this.variant = variant;
    this.text = message;
  }

  /**
   * handles queueing logic for the top-level app component
   */

  public static reducer: Reducer<MessageReducerState, MessageReducerAction> = (
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
}
