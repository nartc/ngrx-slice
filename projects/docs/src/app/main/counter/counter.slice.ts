import { createNamespacedSlice } from '../../../../../ngrx-slice/src/public-api';
import { initialState } from '../../shared/data-access-counter/counter.state';

export const { CounterActions, CounterSelectors, CounterFeature } =
  createNamespacedSlice({
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
