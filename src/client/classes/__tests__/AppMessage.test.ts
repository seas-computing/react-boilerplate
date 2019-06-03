import { strictEqual } from 'assert';
import {
  AppMessage,
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
});
