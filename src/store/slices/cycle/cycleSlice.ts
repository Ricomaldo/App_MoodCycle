import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cycle } from '@core/domain/entities/Cycle';
import { AppDispatch } from '@store/index';
import { CycleRepository } from '@core/data/repositories/CycleRepository';

interface CycleState {
  currentCycle: Cycle | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CycleState = {
  currentCycle: null,
  isLoading: false,
  error: null,
};

const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    setCurrentCycle: (state, action: PayloadAction<Cycle | null>) => {
      state.currentCycle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetCycle: state => {
      state.currentCycle = null;
      state.error = null;
    },
  },
});

export const { setCurrentCycle, setLoading, setError, resetCycle } = cycleSlice.actions;
export default cycleSlice.reducer;

export const loadCurrentCycle = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const repo = new CycleRepository();
    const cycle = await repo.getCurrentCycle();
    dispatch(setCurrentCycle(cycle));
    dispatch(setError(null));
  } catch (e: any) {
    dispatch(setError(e.message));
    dispatch(setCurrentCycle(null));
  } finally {
    dispatch(setLoading(false));
  }
};
