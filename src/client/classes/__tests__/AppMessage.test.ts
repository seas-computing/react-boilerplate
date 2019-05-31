import { strictEqual } from 'assert';
import {
  AppMessage,
  MessageReducerState,
} from '..';
import * as dummy from '../../../common/__tests__/data';

describe('AppMessage', function () {
  describe('Constructor', function () {
    let message: AppMessage;
    describe('With an explicit type', function () {
      beforeEach(function () {
        message = new AppMessage(dummy.string, AppMessage.Type.error);
      });
      it('Should set the message text to the provided value', function () {
        strictEqual(message.text, dummy.string);
      });
      it('Should set the variant to the provided value', function () {
        strictEqual(message.variant, AppMessage.Type.error);
      });
    });
    describe('Without an explicit type', function () {
      beforeEach(function () {
        message = new AppMessage(dummy.string);
      });
      it('Should set the message text to the provided value', function () {
        strictEqual(message.text, dummy.string);
      });
      it('Should set the variant to info', function () {
        strictEqual(message.variant, AppMessage.Type.info);
      });
    });
  });
  describe('reducer', function () {
    let reducedState: MessageReducerState;
    let testMessage: AppMessage;
    describe('Pushing onto the queue', function () {
      context('With no current message', function () {
        beforeEach(function () {
          testMessage = new AppMessage(dummy.string);
          reducedState = AppMessage.reducer(
            {
              queue: [],
              currentMessage: null,
            },
            {
              type: AppMessage.Action.push,
              message: testMessage,
            }
          );
        });
        it('Should leave the queue empty', function () {
          strictEqual(reducedState.queue.length, 0);
        });
        it('Should set the current message to action message', function () {
          strictEqual(reducedState.currentMessage, testMessage);
        });
      });
      context('With a current message in state', function () {
        let oldCurrentMessage: AppMessage;
        context('and nothing in the queue', function () {
          beforeEach(function () {
            testMessage = new AppMessage(dummy.string);
            oldCurrentMessage = new AppMessage('Old Current Message');
            reducedState = AppMessage.reducer(
              {
                queue: [],
                currentMessage: oldCurrentMessage,
              },
              {
                type: AppMessage.Action.push,
                message: testMessage,
              }
            );
          });
          it('Should leave the current Message as is', function () {
            strictEqual(reducedState.currentMessage, oldCurrentMessage);
          });
          it('Should add the new action message to the queue', function () {
            strictEqual(reducedState.queue.length, 1);
            strictEqual(reducedState.queue[0], testMessage);
          });
        });
        context('and one in the queue', function () {
          let oldQueuedMessage: AppMessage;
          beforeEach(function () {
            testMessage = new AppMessage(dummy.string);
            oldCurrentMessage = new AppMessage('Old Current Message');
            oldQueuedMessage = new AppMessage('Old Queued Message');
            reducedState = AppMessage.reducer(
              {
                queue: [oldQueuedMessage],
                currentMessage: oldCurrentMessage,
              },
              {
                type: AppMessage.Action.push,
                message: testMessage,
              }
            );
          });
          it('Should leave the old queued message first in queue', function () {
            strictEqual(reducedState.queue[0], oldQueuedMessage);
          });
          it('Should leave the old current message in place', function () {
            strictEqual(reducedState.currentMessage, oldCurrentMessage);
          });
          it('Should add the new message to the end of the queue', function () {
            strictEqual(reducedState.queue.length, 2);
            strictEqual(reducedState.queue[1], testMessage);
          });
        });
      });
    });
    describe('clearing the current Message', function () {
      context('With no current message', function () {
        beforeEach(function () {
          reducedState = AppMessage.reducer(
            {
              queue: [],
              currentMessage: null,
            },
            {
              type: AppMessage.Action.clear,
            }
          );
        });
        it('Should leave the queue empty', function () {
          strictEqual(reducedState.queue.length, 0);
        });
        it('Should set the current message to undefined', function () {
          strictEqual(reducedState.currentMessage, undefined);
        });
      });
      context('With a current message in state', function () {
        context('and nothing in the queue', function () {
          beforeEach(function () {
            testMessage = new AppMessage('Old Current Message');
            reducedState = AppMessage.reducer(
              {
                queue: [],
                currentMessage: testMessage,
              },
              {
                type: AppMessage.Action.clear,
              }
            );
          });
          it('Should leave the queue empty', function () {
            strictEqual(reducedState.queue.length, 0);
          });
          it('Should set the current Message to undefined', function () {
            strictEqual(reducedState.currentMessage, undefined);
          });
        });
        context('and one in the queue', function () {
          let queuedMessage: AppMessage;
          beforeEach(function () {
            testMessage = new AppMessage('Old Current Message');
            queuedMessage = new AppMessage('Old Queued Message');
            reducedState = AppMessage.reducer(
              {
                queue: [queuedMessage],
                currentMessage: testMessage,
              },
              {
                type: AppMessage.Action.clear,
              }
            );
          });
          it('Should empty the queue', function () {
            strictEqual(reducedState.queue.length, 0);
          });
          it('Should replace the current message with the queued message', function () {
            strictEqual(reducedState.currentMessage, queuedMessage);
          });
        });
      });
    });
  });
});
