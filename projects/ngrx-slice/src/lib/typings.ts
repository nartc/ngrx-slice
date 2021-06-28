import type {
  Action,
  ActionCreator,
  ActionReducer,
  MemoizedSelector,
  ReducerTypes,
} from '@ngrx/store';
import type { Draft } from 'immer';

export type Primitive = string | number | bigint | boolean | null | undefined;

export interface SliceActionNameGetter {
  (featureName: string, actionName: string): string;
}

export declare type PayloadAction<Payload = any> = {
  [PayloadKey in keyof Payload]: Payload[PayloadKey];
} & {
  _payload: Payload;
} & Action;

export interface CaseReducer<
  SliceState = unknown,
  CaseAction extends PayloadAction = any
> {
  (state: Draft<SliceState>, action: CaseAction): void;
}

export interface AsyncCaseReducer<
  SliceState = unknown,
  CaseAction extends PayloadAction = any
> {
  success: CaseReducer<SliceState, CaseAction>;
  failure?: CaseReducer<SliceState, CaseAction>;
  trigger?: CaseReducer<SliceState, CaseAction>;
  clear?: CaseReducer<SliceState, CaseAction>;
  cancel?: CaseReducer<SliceState, CaseAction>;
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

export type NestedSelectors<
  AppState extends Record<string, any>,
  SliceState
> = SliceState extends Primitive | unknown[] | Date
  ? Record<string, never>
  : {
      [K in keyof SliceState &
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
  clear: ActionCreatorForCaseReducer<SliceState, AsyncReducer['clear']>;
  cancel: ActionCreatorForCaseReducer<SliceState, AsyncReducer['cancel']>;
}

export type ActionCreatorForCaseReducer<SliceState, Reducer> =
  (Reducer extends (
    state: Draft<SliceState>,
    action: infer ReducerAction
  ) => void
    ? ReducerAction extends { _payload: infer ActionPayload }
      ? (payload: ActionPayload) => PayloadAction<ActionPayload>
      : () => PayloadAction<never>
    : () => PayloadAction<never>) & {
    type: string;
  };

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
