import { User } from 'server/models';

export const rawRegularUserData = {
  firstName: 'Regular',
  lastName: 'User',
  id: '88888888',
  email: 'test@seas.harvard.edu',
};

export const regularUser: User = new User(rawRegularUserData);
