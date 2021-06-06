import { createSlice } from '../../../../../ngrx-slice/src/public-api';
import { initialState } from '../../shared/data-access-counter/counter.state';

export const {
  actions: CounterActions,
  selectors: CounterSelectors,
  ...counterFeature
} = createSlice({
  name: 'counter',
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
  },
});
