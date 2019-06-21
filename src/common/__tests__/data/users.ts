import { User } from 'server/entities';

export const rawRegularUserData = {
  firstName: 'Regular',
  lastName: 'User',
  id: '88888888',
  email: 'test@seas.harvard.edu',
};

export const regularUser: User = new User(rawRegularUserData);
