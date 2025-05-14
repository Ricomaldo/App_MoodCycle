import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoodState {
  currentMood: string | null;
  moodHistory: {
    date: string;
    mood: string;
  }[];
}

const initialState: MoodState = {
  currentMood: null,
  moodHistory: [],
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood: (state, action: PayloadAction<string>) => {
      state.currentMood = action.payload;
      state.moodHistory.push({
        date: new Date().toISOString(),
        mood: action.payload,
      });
    },
    clearCurrentMood: state => {
      state.currentMood = null;
    },
  },
});

export const { setCurrentMood, clearCurrentMood } = moodSlice.actions;
export default moodSlice.reducer;
