import { configureStore } from '@reduxjs/toolkit';
import moodReducer from './slices/moodSlice';
import cycleReducer from './slices/cycle/cycleSlice';
import conversationReducer from './slices/conversation/conversationSlice';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    cycle: cycleReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
