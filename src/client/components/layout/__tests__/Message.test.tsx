import React from 'react';
import { strictEqual } from 'assert';
import { render, fireEvent } from '@testing-library/react';
import { stub, SinonStub, useFakeTimers } from 'sinon';
import * as dummy from 'testData';
import { MessageType } from 'client/classes';
import { MessageContext } from 'client/context';
import { Message, MessageProps } from '../Message';

describe('Message', function () {
  const props: MessageProps = {
    messageCount: dummy.int,
    messageText: dummy.string,
    messageType: MessageType.error,
  };
  describe('rendering', function () {
    it('Should display the message', async function () {
      const { getByText } = render(<Message {...props} />);
      return getByText(dummy.string);
    });
    context('When there are more messages to come', function () {
      it('Should show the number of messages on the button', async function () {
        const { getByText } = render(<Message {...props} />);
        const clearButton = getByText(`Next (${dummy.int})`);
        strictEqual(clearButton.tagName, 'BUTTON');
        return clearButton;
      });
    });
    context('When there are no more messages to come', function () {
      it('should just display "clear" on the button', async function () {
        const { getByText } = render(<Message {...props} messageCount={0} />);
        const clearButton = getByText('clear');
        strictEqual(clearButton.tagName, 'BUTTON');
        return clearButton;
      });
    });
  });
  describe('Consuming MessageContext', function () {
    let dispatchStub: SinonStub;
    beforeEach(function () {
      dispatchStub = stub();
      this.clock = useFakeTimers();
    });
    afterEach(function () {
      this.clock.restore();
    });
    it('Should provide the clearMessage function to the clear button', function () {
      const { getByText } = render(
        <MessageContext.Provider value={dispatchStub}>
          <Message {...props} messageCount={0} />
        </MessageContext.Provider>
      );
      fireEvent.click(getByText('clear'));
      strictEqual(dispatchStub.callCount, 1);
    });
    it('should automatically clear non-error messages after 5 seconds', function () {
      render(
        <MessageContext.Provider value={dispatchStub}>
          <Message {...props} messageType={MessageType.info} messageCount={0} />
        </MessageContext.Provider>
      );
      strictEqual(dispatchStub.callCount, 0);
      this.clock.tick(5000);
      strictEqual(dispatchStub.callCount, 1);
    });

    it('should never automatically clear non-error messages', function () {
      render(
        <MessageContext.Provider value={dispatchStub}>
          <Message
            {...props}
            messageType={MessageType.error}
            messageCount={0}
          />
        </MessageContext.Provider>
      );
      strictEqual(dispatchStub.callCount, 0);
      this.clock.tick(5000000);
      strictEqual(dispatchStub.callCount, 0);
    });
  });
});
