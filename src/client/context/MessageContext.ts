import { createContext, Context } from 'react';

/**
 * Possible types of message to display to the user
 */

export enum MessageType {
  error = 'error',
  success = 'success',
  info = 'info',
}

/**
 * Fields for a message type.
 *
 * The `setMessage` field here allows you to pass a setter function from the
 * top level App component down to its children through the context api
 */

export interface Message {
  variant: MessageType;
  message: string;
  setMessage?: Function;
}


/**
 * Used for displaying message to the client
 */

export class AppMessage implements Message {
  public variant: MessageType;

  public message: string;

  public setMessage: Function;

  /** Whether the message should be displayed */
  public visible: boolean;

  public constructor(newMessage: Message) {
    this.variant = newMessage.variant;
    this.message = newMessage.message;
    this.visible = true;
    if (newMessage.setMessage) {
      this.setMessage = newMessage.setMessage;
    }
  }

  /**
   * Optionally waits an amount of time before clearing the message,
   * or if called with no argument clears the time immediately
   * */
  public clearMessage(timer: number): void {
    const hide = (): void => {
      this.visible = false;
    };
    if (timer > 0) {
      setTimeout(hide, timer);
    } else {
      hide();
    }
  }
}

/**
 * Global message provider
 */

export const MessageContext: Context<AppMessage> = createContext(null);
