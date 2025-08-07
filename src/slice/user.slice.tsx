import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: localStorage.getItem('userId') || undefined,
    username: localStorage.getItem('username') || undefined,
  } as { userId: string | undefined; username: string | undefined },
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      console.log('User id set:', action.payload.userId);

      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('username', action.payload.username);
    },
    clearUserInfo: (state) => {
      state.userId = undefined;
      state.username = undefined;

      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    },
  },
});

const userReducer = userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
export default userReducer;
