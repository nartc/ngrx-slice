import { createSlice, noopReducer, typedNoopReducer } from './create-slice';
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

const { actions, selectors, reducer, name } = createSlice({
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

describe(createSlice.name, () => {
  it('should return correct name', () => {
    expect(name).toEqual('counter');
  });

  it('should return reducer', () => {
    expect(reducer).toBeTruthy();
  });

  it('should return actions', () => {
    expect(actions).toBeTruthy();
  });

  describe('selectors', () => {
    it('should return selectors', () => {
      expect(selectors).toBeTruthy();
      expect(Object.keys(selectors).length).toEqual(4);
    });

    it('should selectors return correct values', () => {
      expect(selectors.selectCounterState({ counter: initialState })).toEqual(
        initialState
      );

      ['value', 'incremented', 'decremented'].forEach((key) => {
        expect(
          (selectors as any)[`select${capitalize(key)}`]({
            counter: initialState,
          })
        ).toEqual((initialState as any)[key]);
      });
    });
  });

  it('should noop reducers not change state', () => {
    const noop = noopReducer<CounterState>();
    const typedNoop = typedNoopReducer<CounterState, { foo: 'foo' }>();

    noop(initialState, actions.increment());
    expect(initialState).toEqual({ value: 0, incremented: 0, decremented: 0 });

    typedNoop(initialState, actions.increment());
    expect(initialState).toEqual({ value: 0, incremented: 0, decremented: 0 });
  });
});
