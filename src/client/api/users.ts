import request, { AxiosPromise } from 'axios';
import { UserResponse } from 'common/dto/dto/users/userResponse.dto';

/**
 * Get the currently authenticated user
 */

export const getCurrentUser = (): AxiosPromise<UserResponse> => request.get('/api/users/current');
