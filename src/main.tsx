import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.slice.tsx';
import chatRoomReducer from './slice/chatRoom.slice.tsx';

const store = configureStore({
  reducer: {
    user: userReducer,
    chatRoom: chatRoomReducer,
  },
});

createRoot(document.getElementById('root')!).render(
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
);
