import React, { useContext, ReactElement, SFC } from 'react';
import {
  MessageContext,
  MessageType,
  MessageActions,
} from '../../context';

interface MessageProps {
  messageCount: number;
  messageText: string;
  messageType: MessageType;
}

export const Message: SFC<MessageProps> = ({
  messageCount,
  messageText,
  messageType,
}): ReactElement => {
  /**
   * Retrieves the message dispatch function from context
   */

  const messageDispatch = useContext(MessageContext);

  /**
   * auto-clear non-error messages after 5 seconds
   */

  if (messageType !== MessageType.error) {
    setTimeout((): void => {
      messageDispatch({ type: MessageActions.clear });
    }, 5000);
  }

  return (
    <div className={`app-message-${messageType}`}>
      <strong>{messageText}</strong>
      <div>
        <button
          type="button"
          onClick={(): void => {
            messageDispatch({ type: MessageActions.clear });
          }}
        >
          {messageCount > 0 ? `Next (${messageCount})` : 'clear'}
        </button>
      </div>
    </div>
  );
};
