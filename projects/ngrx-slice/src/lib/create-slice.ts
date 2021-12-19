import { createFeatureSelector } from "@ngrx/store";
import type { Draft } from "immer";
import { createSliceActions } from "./create-slice-actions";
import { createSliceReducer } from "./create-slice-reducer";
import { createSliceSelectors } from "./create-slice-selectors";
import type { NamespacedSlice, PayloadAction, Slice, SliceCaseReducers, SliceOptions } from "./typings";
import { classify } from "./utils";

function defaultSliceActionNameGetter(
  featureName: string,
  actionName: string
): string {
  return `[${classify(featureName)}] ${actionName}`;
}

export function noopReducer<ActionProps = false,
  SliceState = any>(): ActionProps extends false
  ? (state: Draft<SliceState>) => void
  : (state: Draft<SliceState>, action: PayloadAction<ActionProps>) => void {
  return (() => {
  }) as unknown as ActionProps extends false
    ? (state: Draft<SliceState>) => void
    : (state: Draft<SliceState>, action: PayloadAction<ActionProps>) => void;
}

export function createSlice<AppState extends Record<string, any>,
  SliceName extends keyof AppState & string = keyof AppState & string,
  SliceState extends AppState[SliceName] = AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>>({
                                                                                        name,
                                                                                        initialState,
                                                                                        reducers,
                                                                                        extraReducers,
                                                                                        sliceActionNameGetter = defaultSliceActionNameGetter
                                                                                      }: SliceOptions<SliceName, SliceState, CaseReducers>): Slice<AppState,
  SliceName,
  SliceState,
  CaseReducers> {
  const featureSelector = createFeatureSelector<SliceState>(name);

  const nestedSelectors = createSliceSelectors<AppState, SliceState>(
    initialState,
    featureSelector
  );

  const actions = createSliceActions<SliceState, SliceName, CaseReducers>(
    name,
    sliceActionNameGetter!,
    reducers
  );

  const reducer = createSliceReducer<AppState,
    SliceName,
    SliceState,
    CaseReducers>(initialState, sliceActionNameGetter!, actions, reducers, extraReducers);

  return {
    name,
    reducer,
    actions,
    selectors: {
      [`select${classify(name)}State`]: featureSelector,
      ...nestedSelectors
    } as Slice<AppState, SliceName, SliceState, CaseReducers>["selectors"]
  };
}

export function createNamespacedSlice<AppState extends Record<string, any>,
  SliceName extends keyof AppState & string = keyof AppState & string,
  SliceState extends AppState[SliceName] = AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>>({
                                                                                        name,
                                                                                        initialState,
                                                                                        reducers,
                                                                                        extraReducers,
                                                                                        sliceActionNameGetter = defaultSliceActionNameGetter
                                                                                      }: SliceOptions<SliceName, SliceState, CaseReducers>): NamespacedSlice<AppState,
  SliceName,
  SliceState,
  CaseReducers> {
  const {
    name: sliceName,
    reducer,
    selectors,
    actions
  } = createSlice({
    name,
    initialState,
    reducers,
    extraReducers,
    sliceActionNameGetter
  });

  return {
    [`${classify(name)}Feature`]: {
      name: sliceName,
      reducer
    },
    [`${classify(name)}Actions`]: actions,
    [`${classify(name)}Selectors`]: selectors
  } as NamespacedSlice<AppState, SliceName, SliceState, CaseReducers>;
}
