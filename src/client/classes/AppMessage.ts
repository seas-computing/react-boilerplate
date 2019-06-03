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
}
