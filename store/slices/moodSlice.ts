import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoodState {
  currentMood: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoodState = {
  currentMood: null,
  isLoading: false,
  error: null,
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood: (state, action: PayloadAction<number>) => {
      state.currentMood = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetMood: (state) => {
      state.currentMood = null;
      state.error = null;
    },
  },
});

export const { setCurrentMood, setLoading, setError, resetMood } = moodSlice.actions;
export default moodSlice.reducer; 