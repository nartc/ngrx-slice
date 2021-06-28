import { createSlice, noopReducer } from './create-slice';
import { PayloadAction } from './typings';
import { capitalize } from './utils';

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

const { CounterActions, CounterSelectors, CounterFeature } = createSlice({
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
      trigger: noopReducer<CounterState, { multiplier: number }>(),
    },
  },
});

describe(createSlice.name, () => {
  it('should return correct name', () => {
    expect(CounterFeature.name).toEqual('counter');
  });

  it('should return reducer', () => {
    expect(CounterFeature.reducer).toBeTruthy();
  });

  it('should return actions', () => {
    expect(CounterActions).toBeTruthy();
  });

  describe('selectors', () => {
    it('should return selectors', () => {
      expect(CounterSelectors).toBeTruthy();
      expect(Object.keys(CounterSelectors).length).toEqual(4);
    });

    it('should selectors return correct values', () => {
      expect(
        CounterSelectors.selectCounterState({ counter: initialState })
      ).toEqual(initialState);

      ['value', 'incremented', 'decremented'].forEach((key) => {
        expect(
          (CounterSelectors as any)[`select${capitalize(key)}`]({
            counter: initialState,
          })
        ).toEqual((initialState as any)[key]);
      });
    });
  });

  it('should noop reducers not change state', () => {
    const noop = noopReducer<CounterState>();
    const typedNoop = noopReducer<CounterState, { foo: 'foo' }>();

    noop(initialState);
    expect(initialState).toEqual({ value: 0, incremented: 0, decremented: 0 });

    typedNoop(initialState, CounterActions.increment());
    expect(initialState).toEqual({ value: 0, incremented: 0, decremented: 0 });
  });
});
