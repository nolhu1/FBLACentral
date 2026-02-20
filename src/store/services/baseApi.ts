import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'Event', 'Announcement', 'Resource', 'Chapter'],
  endpoints: () => ({}),
});