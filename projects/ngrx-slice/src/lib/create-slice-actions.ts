import { ActionCreator, createAction, props } from '@ngrx/store';
import type {
  SliceActionNameGetter,
  SliceActions,
  SliceCaseReducers,
} from './typings';

export function createSliceActions<
  SliceState,
  SliceName extends string = string,
  CaseReducers extends SliceCaseReducers<SliceState> = SliceCaseReducers<SliceState>
>(
  featureName: SliceName,
  sliceActionNameGetter: SliceActionNameGetter,
  reducers: CaseReducers
): SliceActions<SliceState, CaseReducers> {
  const actions: Record<string, ActionCreator | Record<string, ActionCreator>> =
    {};

  actions['noop'] = createAction(
    sliceActionNameGetter(featureName, 'noop effect'),
    props<Record<string, unknown>>()
  );

  for (const [reducerKey, reducerValue] of Object.entries(reducers)) {
    const typeOfReducer = typeof reducerValue;
    const sliceActionName = sliceActionNameGetter(featureName, reducerKey);

    if (typeOfReducer === 'function') {
      actions[reducerKey] = createAction(
        sliceActionName,
        props<Record<string, unknown>>()
      );
      continue;
    }

    actions[reducerKey] = {};
    Object.keys(reducerValue).forEach((asyncKey) => {
      (actions[reducerKey] as Record<string, ActionCreator>)[asyncKey] =
        createAction(
          `${sliceActionName} ${asyncKey}`,
          props<Record<string, unknown>>()
        );
    });
  }

  return actions as SliceActions<SliceState, CaseReducers>;
}
