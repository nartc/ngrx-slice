import { createFeatureSelector } from '@ngrx/store';
import type { Draft } from 'immer';
import { createSliceActions } from './create-slice-actions';
import { createSliceReducer } from './create-slice-reducer';
import { createSliceSelectors } from './create-slice-selectors';
import type {
  CaseReducer,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  SliceOptions,
} from './typings';
import { capitalize } from './utils';

function defaultSliceActionNameGetter(
  featureName: string,
  actionName: string
): string {
  return `[${capitalize(featureName)}] ${actionName}`;
}

export function noopReducer<SliceState>(): CaseReducer<SliceState> {
  return (state) => state;
}

export function typedNoopReducer<
  SliceState,
  ActionProps extends Record<string, unknown>
>(): (state: Draft<SliceState>, action: PayloadAction<ActionProps>) => void {
  return (state, _) => state;
}

export function createSlice<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string = keyof AppState & string,
  SliceState extends AppState[SliceName] = AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>
>({
  name,
  initialState,
  reducers,
  extraReducers,
  sliceActionNameGetter = defaultSliceActionNameGetter,
}: SliceOptions<SliceName, SliceState, CaseReducers>): Slice<
  AppState,
  SliceName,
  SliceState,
  CaseReducers
> {
  const featureSelector = createFeatureSelector<AppState, SliceState>(name);

  const nestedSelectors = createSliceSelectors<AppState, SliceState>(
    initialState,
    featureSelector
  );

  const actions = createSliceActions<SliceState, SliceName, CaseReducers>(
    name,
    sliceActionNameGetter,
    reducers
  );

  const reducer = createSliceReducer<
    AppState,
    SliceName,
    SliceState,
    CaseReducers
  >(initialState, sliceActionNameGetter, actions, reducers, extraReducers);

  return {
    name,
    reducer,
    actions,
    selectors: {
      [`select${capitalize(name)}State`]: featureSelector,
      ...nestedSelectors,
    } as Slice<AppState, SliceName, SliceState, CaseReducers>['selectors'],
  };
}
