import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: undefined,
    username: undefined,
  } as { userId: string | undefined; username: string | undefined },
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
export default userReducer;
