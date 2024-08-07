import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/redux/quizSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
