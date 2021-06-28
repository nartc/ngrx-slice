# ngrx-slice

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f8041e8-2f30-4786-ade1-3e870518c1a1/deploy-status)](https://app.netlify.com/sites/ngrx-slice/deploys)

`ngrx-slice` is a plugin that intends to provide the same functionalities
that [Redux Toolkit createSlice](https://redux-toolkit.js.org/api/createSlice) provides. It is meant to be **
opinionated**.

## Installation

```shell
npm install ngrx-slice
```

```shell
yarn add ngrx-slice
```

### Peer Dependencies

`ngrx-slice` has `ngrx-immer` and `immer` as its `peerDependencies` so go ahead and install those:

```shell
npm install ngrx-immer immer
```

```shell
yarn add ngrx-immer immer
```

Here's one command for all three:

```shell
npm install ngrx-slice ngrx-immer immer
```

```shell
yarn add ngrx-slice ngrx-immer immer
```

## Documentations

Visit [NgRX Slice Documentations](https://ngrx-slice.netlify.app/)

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

export type SliceActionsReturn<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = {
  [ActionKey in SliceName as `${Capitalize<ActionKey>}Actions`]: SliceActions<
    SliceState,
    CaseReducers
  >;
};

export type SliceSelectorsReturn<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = {
  [SelectorsKey in SliceName as `${Capitalize<SelectorsKey>}Selectors`]: SliceSelector<
    AppState,
    SliceName,
    SliceState
  > &
    NestedSelectors<AppState, SliceState>;
};

export type SliceFeatureReturn<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = {
  [FeatureKey in SliceName as `${Capitalize<FeatureKey>}Feature`]: {
    name: SliceName;
    reducer: ActionReducer<SliceState>;
  };
};

export type Slice<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = SliceActionsReturn<AppState, SliceName, SliceState, CaseReducers> &
  SliceSelectorsReturn<AppState, SliceName, SliceState, CaseReducers> &
  SliceFeatureReturn<AppState, SliceName, SliceState, CaseReducers>;

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

## Contribution

Contributions welcome
