import { createContext, Context } from 'react';
import { User } from '../../server/models/user.class';

/**
 * Manage the currently logged-in user throught Context
 */

export const UserContext: Context<User> = createContext(null);
