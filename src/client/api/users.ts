import request, { AxiosPromise } from 'axios';
import { UserResponse as User } from 'client/dto/users/userResponse.dto';

/**
 * Get the currently authenticated user
 */

export const getCurrentUser = (): AxiosPromise<User> => request.get('/api/users/current');
