import { strictEqual } from 'assert';
import { regularUser } from 'testData';
import { User } from '../user.entity';

describe('User', function () {
  describe('constructor', function () {
    it('hydrates the class with the data provided', function () {
      const userData = {
        eppn: '123@harvard.edu',
        firstName: 'Jim',
        lastName: 'Waldo',
        email: 'waldo@harvard.edu',
      };

      const user = new User(userData);

      strictEqual(userData.eppn, user.eppn);
      strictEqual(userData.email, user.email);
      strictEqual(userData.firstName, user.firstName);
      strictEqual(userData.lastName, user.lastName);
    });
  });
  describe('fullName', function () {
    it('concatenates the user\'s first and last name', function () {
      strictEqual(
        regularUser.fullName,
        `${regularUser.firstName} ${regularUser.lastName}`
      );
    });
  });
  describe('listName', function () {
    it('concatenates the user\'s first and last name', function () {
      strictEqual(
        regularUser.listName,
        `${regularUser.lastName}, ${regularUser.firstName}`
      );
    });
  });
});
