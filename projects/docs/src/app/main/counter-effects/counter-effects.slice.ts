import {
  createNamespacedSlice,
  noopReducer,
  PayloadAction,
} from '../../../../../ngrx-slice/src/public-api';
import { initialState } from '../../shared/data-access-counter/counter.state';

export const {
  CounterEffectsActions,
  CounterEffectsSelectors,
  CounterEffectsFeature,
} = createNamespacedSlice({
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
      trigger: noopReducer<{ multiplier: number }>(),
      cancel: noopReducer(),
    },
  },
});
