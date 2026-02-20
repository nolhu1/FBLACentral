import { baseApi } from './baseApi';
import type { AnnouncementItem } from '../../types/models';

export const announcementsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAnnouncements: builder.query<AnnouncementItem[], void>({
      queryFn: async () => {
        return {
          data: [
            {
              id: 'ann-1',
              title: 'Welcome to FBLA Connect',
              body: 'This is a demo announcement.',
              scope: 'national',
              pinned: true,
              createdAtISO: new Date().toISOString(),
            },
          ],
        };
      },
      providesTags: [{ type: 'Announcement', id: 'LIST' }],
    }),
  }),
});

export const { useListAnnouncementsQuery } = announcementsApi;