import type { ActionCreator, ActionReducer } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import type { ImmerOnReducer } from 'ngrx-immer/store';
import { immerOn } from 'ngrx-immer/store';
import type {
  CaseReducer,
  SliceActionNameGetter,
  SliceActions,
  SliceCaseReducers,
  SliceOptions,
} from './typings';

export function createSliceReducer<
  AppState extends Record<string, any>,
  SliceName extends keyof AppState & string = keyof AppState & string,
  SliceState extends AppState[SliceName] = AppState[SliceName],
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>
>(
  initialState: SliceState,
  sliceActionNameGetter: SliceActionNameGetter,
  actions: SliceActions<SliceState, CaseReducers>,
  reducers: CaseReducers,
  extraReducers?: SliceOptions<
    SliceName,
    SliceState,
    CaseReducers
  >['extraReducers']
): ActionReducer<SliceState> {
  const reducerArgs = [] as Array<ReturnType<typeof on>>;
  const extra: Array<ReturnType<typeof on>> = (extraReducers || []) as Array<
    ReturnType<typeof on>
  >;

  for (const [reducerKey, reducer] of Object.entries(reducers)) {
    const typeOfReducer = typeof reducer;

    if (typeOfReducer === 'function') {
      reducerArgs.push(
        immerOn(
          actions[reducerKey] as unknown as ActionCreator,
          reducer as unknown as ImmerOnReducer<any, any>
        )
      );
      continue;
    }

    Object.keys(reducer).forEach((asyncKey) => {
      const asyncReducer = (reducer as unknown as Record<string, CaseReducer>)[
        asyncKey
      ];
      reducerArgs.push(
        immerOn(
          (actions[reducerKey] as unknown as Record<string, ActionCreator>)[
            asyncKey
          ],
          asyncReducer as unknown as ImmerOnReducer<any, any>
        )
      );
    });
  }

  return createReducer(initialState, ...(reducerArgs.concat(extra) as any));
}
