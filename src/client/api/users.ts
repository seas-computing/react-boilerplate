import request, { AxiosPromise } from 'axios';
import { User } from '../../server/models/user.class';

/**
 * Get the currently authenticated user
 */

export const getCurrentUser = (): AxiosPromise<User> => request.get('/api/users/current');
