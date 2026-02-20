import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  isBusy: boolean;
  busyMessage: string | null;
};

const initialState: UiState = {
  isBusy: false,
  busyMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setBusy(state, action: PayloadAction<{ isBusy: boolean; message?: string }>) {
      state.isBusy = action.payload.isBusy;
      state.busyMessage = action.payload.isBusy ? action.payload.message ?? null : null;
    },
  },
});

export const { setBusy } = uiSlice.actions;
export default uiSlice.reducer;