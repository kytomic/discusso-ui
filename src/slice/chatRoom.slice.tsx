import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    friendId: undefined,
    friendName: undefined,
    clickedMessageId: undefined,
  } as {
    friendId: string | undefined;
    friendName: string | undefined;
  },
  reducers: {
    setChatRoomInfo: (state, action) => {
      state.friendId = action.payload.friendId;
      state.friendName = action.payload.friendName;
    },
  },
});

const chatRoomReducer = chatRoomSlice.reducer;
export const { setChatRoomInfo } = chatRoomSlice.actions;
export default chatRoomReducer;
