import React, { useContext, ReactElement } from 'react';
import { MessageContext } from '../../context';

export const Message = (): ReactElement => {
  const { variant, message } = useContext(MessageContext);

  return (
    <div className={`app-message-${variant}`}>
      <strong>{message}</strong>
    </div>
  );
};
