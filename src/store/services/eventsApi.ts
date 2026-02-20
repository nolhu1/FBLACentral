import { baseApi } from './baseApi';
import type { EventItem } from '../../types/models';

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listEvents: builder.query<EventItem[], void>({
      queryFn: async () => {
        return {
          data: [
            {
              id: 'event-1',
              title: 'Chapter Meeting',
              description: 'Monthly chapter meeting.',
              startTimeISO: new Date().toISOString(),
              endTimeISO: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
              level: 'chapter',
              category: 'Meeting',
              location: 'Room 101',
            },
          ],
        };
      },
      providesTags: [{ type: 'Event', id: 'LIST' }],
    }),
  }),
});

export const { useListEventsQuery } = eventsApi;