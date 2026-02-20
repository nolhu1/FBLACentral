import { baseApi } from './baseApi';
import type { ResourceItem } from '../../types/models';

export const resourcesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listResources: builder.query<ResourceItem[], void>({
      queryFn: async () => {
        return {
          data: [
            {
              id: 'res-1',
              title: 'Competitive Events Guide',
              category: 'Competitive Events',
              description: 'Key rules and guidelines.',
              docType: 'link',
              url: 'https://example.com',
              tags: ['rules', 'events'],
            },
          ],
        };
      },
      providesTags: [{ type: 'Resource', id: 'LIST' }],
    }),
  }),
});

export const { useListResourcesQuery } = resourcesApi;