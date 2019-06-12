import { createContext, Context } from 'react';
import { UserResponse } from 'common/dto/users/userResponse.dto';

/**
 * Manage the currently logged-in user throught Context
 */

export const UserContext: Context<UserResponse> = createContext(null);
