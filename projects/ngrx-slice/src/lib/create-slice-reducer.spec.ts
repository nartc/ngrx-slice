import type { ActionReducer } from '@ngrx/store';
import { createAction, on } from '@ngrx/store';
import { createSliceReducer } from './create-slice-reducer';

const initialState = {
  foo: 1,
};

const getter = (featureName: string, actionName: string) =>
  `${featureName}/${actionName}`;

const actions = {
  increment: createAction('foo/increment'),
  decrement: createAction('foo/decrement'),
};

const double = createAction('foo/double');

describe(createSliceReducer.name, () => {
  let reducer: ActionReducer<{ foo: number }>;

  beforeEach(() => {
    reducer = createSliceReducer(
      initialState,
      getter,
      actions as any,
      {
        increment: (state) => {
          state.foo++;
        },
        decrement: (state) => {
          state.foo--;
        },
      },
      [
        on<typeof initialState, [typeof double]>(double, (state) => ({
          ...state,
          foo: state.foo * 2,
        })),
      ]
    );
  });

  it('should be truthy', () => {
    expect(reducer).toBeTruthy();
  });

  it('should update state correctly for case reducers', () => {
    const incremented = reducer(initialState, actions.increment());
    expect(incremented.foo).toEqual(initialState.foo + 1);

    const decremented = reducer(initialState, actions.decrement());
    expect(decremented.foo).toEqual(initialState.foo - 1);
  });

  it('should update state correctly for extra reducers', () => {
    const doubled = reducer(initialState, double());
    expect(doubled.foo).toEqual(initialState.foo * 2);
  });
});
