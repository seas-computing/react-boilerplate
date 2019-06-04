import React, { useContext, ReactElement, SFC } from 'react';
import { MESSAGE_TYPE, MESSAGE_ACTION } from '../../classes';
import { MessageContext } from '../../context';

export interface MessageProps {
  messageCount: number;
  messageText: string;
  messageType: MESSAGE_TYPE;
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

  if (messageType !== MESSAGE_TYPE.ERROR) {
    setTimeout((): void => {
      messageDispatch({ type: MESSAGE_ACTION.CLEAR });
    }, 5000);
  }

  return (
    <div className={`app-message-${messageType}`}>
      <strong>{messageText}</strong>
      <div>
        <button
          type="button"
          onClick={(): void => {
            messageDispatch({ type: MESSAGE_ACTION.CLEAR });
          }}
        >
          {messageCount > 0 ? `Next (${messageCount})` : 'clear'}
        </button>
      </div>
    </div>
  );
};
