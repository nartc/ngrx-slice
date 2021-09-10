import type {
  Action,
  ActionCreator,
  ActionReducer,
  MemoizedSelector,
  ReducerTypes,
} from '@ngrx/store';
import type { Draft } from 'immer';

export type WordSeparators = '-' | '_' | ' ';

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

type InnerCamelCaseStringArray<
  Parts extends readonly any[],
  PreviousPart
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? FirstPart extends undefined
    ? ''
    : FirstPart extends ''
    ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
    : `${PreviousPart extends ''
        ? FirstPart
        : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
        RemainingParts,
        FirstPart
      >}`
  : '';

type CamelCaseStringArray<Parts extends readonly string[]> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts
]
  ? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<
      RemainingParts,
      FirstPart
    >}`>
  : never;

export type CamelCase<K> = K extends string
  ? CamelCaseStringArray<
      Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
    >
  : K;

export type ClassifiedCase<Value> = CamelCase<Value> extends string
  ? Capitalize<CamelCase<Value>>
  : CamelCase<Value>;

export type Primitive = string | number | bigint | boolean | null | undefined;

export interface SliceActionNameGetter {
  (featureName: string, actionName: string): string;
}

export type PayloadAction<Payload = any> = {
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
  [K in SliceName as `select${ClassifiedCase<K>}State`]: MemoizedSelector<
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
        string as `select${ClassifiedCase<K>}`]: MemoizedSelector<
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
      : () => PayloadAction
    : () => PayloadAction) & {
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

export type SliceActionsReturn<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = {
  [ActionKey in SliceName as `${ClassifiedCase<ActionKey>}Actions`]: SliceActions<
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
  [SelectorsKey in SliceName as `${ClassifiedCase<SelectorsKey>}Selectors`]: SliceSelector<
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
  [FeatureKey in SliceName as `${ClassifiedCase<FeatureKey>}Feature`]: {
    name: SliceName;
    reducer: ActionReducer<SliceState>;
  };
};

export type NamespacedSlice<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string,
  SliceState extends AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState>
> = SliceActionsReturn<AppState, SliceName, SliceState, CaseReducers> &
  SliceSelectorsReturn<AppState, SliceName, SliceState, CaseReducers> &
  SliceFeatureReturn<AppState, SliceName, SliceState, CaseReducers>;
