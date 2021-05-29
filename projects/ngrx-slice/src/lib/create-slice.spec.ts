import { createSlice, typedNoopReducer } from './create-slice';
import { PayloadAction } from './typings';

interface CounterState {
  value: number;
  incremented: number;
  decremented: number;
}

const initialState: CounterState = {
  decremented: 0,
  incremented: 0,
  value: 0,
};

describe(createSlice.name, () => {
  const { actions } = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        state.value++;
      },
      decrement: (state) => {
        state.value--;
      },
      multiplyBy: {
        success: (state, action: PayloadAction<{ value: number }>) => {
          state.value = action.value;
        },
        trigger: typedNoopReducer<CounterState, { multiplier: number }>(),
      },
    },
  });

  actions.multiplyBy.success({ value: 123 });
  actions.multiplyBy.trigger({ multiplier: 1 });
});
