import {
  createSlice,
  PayloadAction,
  typedNoopReducer,
} from '../../../../../ngrx-slice/src/public-api';
import {
  CounterState,
  initialState,
} from '../../shared/data-access-counter/counter.state';

export const {
  actions: CounterActions,
  selectors: CounterSelectors,
  ...counterFeature
} = createSlice({
  name: 'counter-effects',
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
      trigger: typedNoopReducer<CounterState, { multiplier: number }>(),
    },
  },
});
