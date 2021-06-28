import {
  createSlice,
  noopReducer,
  PayloadAction,
} from '../../../../../ngrx-slice/src/public-api';
import {
  CounterState,
  initialState,
} from '../../shared/data-access-counter/counter.state';

export const {
  CounterEffectsActions,
  CounterEffectsSelectors,
  CounterEffectsFeature,
} = createSlice({
  name: 'counterEffects',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
      state.incrementCount++;
    },
    decrement: (state) => {
      state.value--;
      state.decrementCount++;
    },
    multiplyBy: {
      success: (state, action: PayloadAction<{ value: number }>) => {
        state.value = action.value;
      },
      trigger: noopReducer<CounterState, { multiplier: number }>(),
      cancel: noopReducer<CounterState>(),
    },
  },
});
