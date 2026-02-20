import { baseApi } from './baseApi';
import type { Chapter } from '../../types/models';

export const chaptersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapterById: builder.query<Chapter, string>({
      queryFn: async (chapterId) => {
        return {
          data: {
            id: chapterId,
            name: 'Demo Chapter',
            schoolName: 'Demo High School',
            state: 'CA',
            socialLinks: {
              instagram: 'https://instagram.com/fbla',
              website: 'https://fbla.org',
            },
          },
        };
      },
      providesTags: (_result, _err, id) => [{ type: 'Chapter', id }],
    }),
  }),
});

export const { useGetChapterByIdQuery } = chaptersApi;