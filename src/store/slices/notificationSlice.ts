import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationPrefs } from '../../types/models';

type NotificationState = {
  prefs: NotificationPrefs;
};

const initialState: NotificationState = {
  prefs: {
    announcements: true,
    events: true,
    resources: true,
    quietHours: null,
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationPrefs(state, action: PayloadAction<NotificationPrefs>) {
      state.prefs = action.payload;
    },
  },
});

export const { setNotificationPrefs } = notificationSlice.actions;
export default notificationSlice.reducer;