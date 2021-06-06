# ngrx-slice

`ngrx-slice` is a plugin that intends to provide the same functionalities
that [Redux Toolkit createSlice](https://redux-toolkit.js.org/api/createSlice) provides. It is meant to be **opinionated**.

## Peer Dependencies

<table>
  <thead>
    <tr>
      <th>Angular</th>
      <th>NgRX</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>12+</td>
      <td>12+</td>
    </tr>
    <tr>
      <td>11+</td>
      <td>11+</td>
    </tr>
    <td colspan="2">No support for Angular < 11 because of TS version</td>
  </tbody>
</table>

## Features

- Express a slice of the global state in a single central place
- Generate `ActionCreators` from reducers' cases
- Generate **Async** `ActionCreators` from reducers' cases
- Generate `MemoizedSelectors` from `initialState`
- Utilize [Immer](https://immerjs.github.io/immer/) and [ngrx-immer](https://github.com/timdeschryver/ngrx-immer) under
  the hood for State updates
- Customizable (partial) Actions' types

## Installation

```shell
npm install ngrx-slice
```

```shell
yarn add ngrx-slice
```

`ngrx-slice` depends on `ngrx-immer` and `immer` so those two will be installed along with `ngrx-slice`

## Why

**NgRX** has always been _coupled_ with **boilerplate**. Even with the new Creator APIs, the amount of boilerplate
needed to set up a single feature state is still a lot (to remember). To fully utilize **NgRX** for a Feature State,
you'd need:

- Actions (`createAction`)
- Selectors (`createSelector` and `createFeatureSelector`)
- Reducer (`createReducer`)

Regardless of whether you separate these entities into different files, or keep them in the same file, the cognitive
overhead is still there. `ngrx-slice` solves this issue for me.

Here's an example of a `CounterState` using `createAction`, `createSelector`, `createFeatureSelector`,
and `createReducer`

```ts
// Actions
const increment = createAction("[Counter] increment");
const decrement = createAction("[Counter] decrement");
const double = createAction("[Counter] double");
const multiplyBy = createAction(
  "[Counter] multiplyBy",
  props<{ multiplier: number }>()
);
const multiplyBySuccess = createAction(
  "[Counter] multiplyBy success",
  props<{ value: number }>()
);

// Reducer
interface CounterState {
  value: number;
  increment: number;
  decrement: number;
}

const initialState: CounterState = {
  value: 0,
  increment: 0,
  decrement: 0,
};

const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({
    ...state,
    value: state.value + 1,
    increment: state.increment + 1,
  })),
  on(decrement, (state) => ({
    ...state,
    value: state.value - 1,
    decrement: state.decrement + 1,
  })),
  on(multiplyBySuccess, (state, action) => ({ ...state, value: action.value })),
  on(double, (state) => ({ ...state, value: state.value * 2 }))
);

// Selectors
const selectCounterState = createFeatureSelector("counter");
const selectValue = createSelector(selectCounterState, (state) => state.value);
const selectIncrement = createSelector(
  selectCounterState,
  (state) => state.increment
);
const selectDecrement = createSelector(
  selectCounterState,
  (state) => state.decrement
);

// Module
@NgModule({
  imports: [
    StoreModule.forFeature({ name: "counter", reducer: counterReducer }),
  ],
})
export class CounterModule {}
```

> There is an `Effect` that will handle `multiplyBy` action but this will be the same for `ngrx-slice` as well.

## Setup

As we can see from above, the amount of code is, well _not much_, but not so little either. Here's the
same `CounterState` with `ngrx-slice`

```ts
interface CounterState {
  value: number;
  increment: number;
  decrement: number;
}

const initialState: CounterState = {
  value: 0,
  increment: 0,
  decrement: 0,
};

const {
  actions: CounterActions,
  selectors: CounterSelectors,
  ...counterFeature
} = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
      state.increment++;
    },
    decrement: (state) => {
      state.value--;
      state.decrement++;
    },
    double: (state) => {
      state.value *= 2;
    },
    multiplyBy: {
      success: (state, action: PayloadAction<{ value: number }>) => {
        state.value = action.value;
      },
      trigger: typedNoopReducer<CounterState, { multiplier: number }>(),
    },
  },
});

// Actions are generated from reducers
const {
  increment,
  decrement,
  double,
  multiplyBy: { trigger, success },
} = CounterActions;

// Selectors are generated from initialState
const { selectCounterState, selectValue, selectIncrement, selectDecrement } =
  CounterSelectors;

export { CounterActions, CounterSelectors, counterFeature };

// Module
@NgModule({
  imports: [StoreModule.forFeature(counterFeature)],
})
export class CounterModule {}
```

### Noop Reducers

Not all Actions need to be handled by Reducers. Sometimes, we have some Actions as triggers for Side Effects. For these cases, `ngrx-slice` provides two **Noop Reducers**

- `noopReducer<SliceState>()`: This reducer is the same as `(state: SliceState) => void` which does nothing rather than making itself available as a generated actions.
- `typedNoopReducers<SliceState, ActionPayload>()`: This reducer also does not change State but allows `ngrx-slice` to generate the Action with the correct type for the `payload`

For example:

```ts
const {
  actions: AuthActions,
  selectors: AuthSelectors,
  ...authFeature
} = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
        trigger: typedNoopReducer<AuthState, {username: string, password: string}>(),
        success: /*...success reducer */
    },
    logout: {
        trigger: noopReducer<AuthState>(),
        success: /*...success reducer */
    }
  },
});

// login.trigger() and logout.trigger() will not change the State
AuthActions.login.trigger({username, password});
AuthActions.logout.trigger();
```

### Action Type

By default, all generated actions will have the following type: `[featureName_in_capitalize]: actionName` and all generated async actions will have the same type with `success`, `failure`, and `trigger` prefixed to respective actions. For example:

```ts
CounterActions.increment(); // {type: '[Counter] increment'}
CounterActions.decrement(); // {type: '[Counter] decrement'}
CounterActions.double(); // {type: '[Counter] double'}
CounterActions.multiplyBy.trigger(); // {type: '[Counter] multiplyBy trigger'}
CounterActions.multiplyBy.success(); // {type: '[Counter] multiplyBy success'}
```

This behavior is customizable with `sliceActionNameGetter` that `createSlice` accepts. `sliceActionNameGetter` has the following signature:

```ts
(featureName: string, actionName: string) => string;
```

### External Actions

With `createSlice` API, internal reducers are used to generate `ActionCreators`, what about external actions that can change the `CounterState`? We can use `extraReducers` for that

```ts
import { triple } from "path/to/external";

const {
  actions: CounterActions,
  selectors: CounterSelectors,
  ...counterFeature
} = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
      state.increment++;
    },
    decrement: (state) => {
      state.value--;
      state.decrement++;
    },
    double: (state) => {
      state.value *= 2;
    },
    multiplyBy: {
      success: (state, action: PayloadAction<{ value: number }>) => {
        state.value = action.value;
      },
      trigger: typedNoopReducer<CounterState, { multiplier: number }>(),
    },
  },
  extraReducers: [
    on<CounterState, [typeof triple]>(triple, (state) => ({
      ...state,
      value: state.value * 3,
    })),
  ],
});
```

Because `triple` is an action that is external to this slice, `createSlice` will not generate an action for `triple` when it's used in `extraReducers`.

`extraReducers` will be merged with `reducers` and return a complete `reducer` for `StoreModule.forFeature()`

## API

### `createSlice`

```ts
export interface SliceOptions<
  SliceName extends string,
  SliceState,
  CaseReducers extends SliceCaseReducers<SliceState>
> {
  name: SliceName;
  initialState: SliceState;
  reducers: CaseReducers;
  extraReducers?: Array<ReducerTypes<SliceState, readonly ActionCreator[]>>;
  sliceActionNameGetter?: SliceActionNameGetter;
}

export interface Slice<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> {
  name: SliceName;
  reducer: ActionReducer<SliceState>;
  actions: SliceActions<SliceState, CaseReducers>;
  selectors: SliceSelector<AppState, SliceName, SliceState> &
    NestedSelectors<AppState, SliceState>;
}

export declare function createSlice<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string = keyof AppState & string,
  SliceState extends AppState[SliceName] = AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>
>({
  name,
  initialState,
  reducers,
  extraReducers,
  sliceActionNameGetter,
}: SliceOptions<SliceName, SliceState, CaseReducers>): Slice<
  AppState,
  SliceName,
  SliceState,
  CaseReducers
>;
```

## Mention

- Marko Stanimirović ([@MarkoStDev](https://twitter.com/MarkoStDev)) for `ngrx-child-selectors` and his PR
- Tim Deschryver ([@tim_deschryver](https://twitter.com/tim_deschryver)) for `ngrx-immer`
- Mark Erikson ([@acemarke](https://twitter.com/acemarke)) for Redux Toolkit

## Contribution

Contributions welcome
