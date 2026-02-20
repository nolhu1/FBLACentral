import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  status: 'unknown' | 'signedOut' | 'signedIn';
  userId: string | null;
};

const initialState: AuthState = {
  status: 'unknown',
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn(state, action: PayloadAction<{ userId: string }>) {
      state.status = 'signedIn';
      state.userId = action.payload.userId;
    },
    setSignedOut(state) {
      state.status = 'signedOut';
      state.userId = null;
    },
    setAuthUnknown(state) {
      state.status = 'unknown';
      state.userId = null;
    },
  },
});

export const { setSignedIn, setSignedOut, setAuthUnknown } = authSlice.actions;
export default authSlice.reducer;