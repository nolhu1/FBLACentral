import { baseApi } from './baseApi';
import type { UserProfile } from '../../types/models';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserProfile, string>({
      queryFn: async (userId) => {
        // stub
        return {
          data: {
            id: userId,
            name: 'Demo User',
            chapterId: 'demo-chapter',
            state: 'CA',
            gradYear: 2027,
            role: 'member',
            interests: ['Leadership', 'Competition'],
          },
        };
      },
      providesTags: (_result, _err, userId) => [{ type: 'User', id: userId }],
    }),
  }),
});

export const { useGetUserByIdQuery } = usersApi;