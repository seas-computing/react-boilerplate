/**
 * Possible types of message to display to the user
 */

export enum MESSAGE_TYPE {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}

/**
 * Possible actions to take on the message queue
 */

export enum MESSAGE_ACTION {
  PUSH = 'PUSH',
  CLEAR = 'CLEAR',
}
/**
 * Used for displaying messages on the client
 */

export class AppMessage {
  public readonly variant: MESSAGE_TYPE;

  public readonly text: string;

  /**
   * Create a new application message. By default, sets the message priority to
   * "info", but alternativae values can be passed in as the second parameter.
   */

  public constructor(
    message: string,
    variant: MESSAGE_TYPE = MESSAGE_TYPE.INFO
  ) {
    this.variant = variant;
    this.text = message;
  }
}
