import type {
  Action,
  ActionCreator,
  ActionReducer,
  MemoizedSelector,
  ReducerTypes,
} from '@ngrx/store';
import type { Draft } from 'immer';

export type Primitive = string | number | bigint | boolean | null | undefined;

export type RequiredKeys<T> = {
  [K in keyof T]: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

export type NonOptional<T> = Pick<T, RequiredKeys<T>>;

export interface SliceActionNameGetter {
  (featureName: string, actionName: string): string;
}

export type PayloadAction<Payload extends Record<string, any> = any> = {
  [PayloadKey in keyof Payload]: Payload[PayloadKey];
} &
  Action & { _payload: Payload };

export interface CaseReducer<SliceState = unknown> {
  (state: Draft<SliceState>, action: PayloadAction): void;
}

export interface AsyncCaseReducer<SliceState = unknown> {
  success: CaseReducer<SliceState>;
  failure?: CaseReducer<SliceState>;
  trigger?: CaseReducer<SliceState>;
}

export interface SliceCaseReducers<SliceState = unknown> {
  [K: string]: CaseReducer<SliceState> | AsyncCaseReducer<SliceState>;
}

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

export type SliceSelector<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName]
> = {
  [K in SliceName as `select${Capitalize<K>}State`]: MemoizedSelector<
    AppState,
    SliceState
  >;
};

export type NestedSelectors<AppState extends Record<string, any>, SliceState> =
  SliceState extends Primitive | unknown[] | Date
    ? Record<string, never>
    : {
        [K in keyof NonOptional<SliceState> &
          string as `select${Capitalize<K>}`]: MemoizedSelector<
          AppState,
          SliceState[K]
        >;
      };

export type SliceActions<
  SliceState,
  CaseReducers extends SliceCaseReducers<SliceState>
> = {
  [Type in keyof CaseReducers]: CaseReducers[Type] extends AsyncCaseReducer<SliceState>
    ? ActionCreatorForAsyncCaseReducer<SliceState, CaseReducers[Type]>
    : ActionCreatorForCaseReducer<SliceState, CaseReducers[Type]>;
};

export interface ActionCreatorForAsyncCaseReducer<
  SliceState,
  AsyncReducer extends AsyncCaseReducer<SliceState>
> {
  success: ActionCreatorForCaseReducer<SliceState, AsyncReducer['success']>;
  failure: ActionCreatorForCaseReducer<SliceState, AsyncReducer['failure']>;
  trigger: ActionCreatorForCaseReducer<SliceState, AsyncReducer['trigger']>;
}

export type ActionCreatorForCaseReducer<SliceState, Reducer> =
  (Reducer extends (
    state: SliceState,
    action: infer ReducerAction
  ) => SliceState
    ? ReducerAction extends { _payload: infer ActionPayload }
      ? (payload: ActionPayload) => PayloadAction<ActionPayload>
      : () => PayloadAction<never>
    : () => PayloadAction<never>) & {
    type: string;
  };

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
