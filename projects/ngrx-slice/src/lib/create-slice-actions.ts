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

  Object.entries(reducers).forEach(([reducerKey, reducerValue]) => {
    const typeOfReducer = typeof reducerValue;
    const sliceActionName = sliceActionNameGetter(featureName, reducerKey);
    if (typeOfReducer === 'function') {
      actions[reducerKey] = createAction(sliceActionName, props<any>());
    } else if (typeOfReducer === 'object') {
      actions[reducerKey] = {};
      ['success', 'failure', 'trigger'].forEach((asyncKey) => {
        (actions[reducerKey] as Record<string, ActionCreator>)[asyncKey] =
          createAction(`${sliceActionName} ${asyncKey}`, props<any>());
      });
    }
  });

  return actions as SliceActions<SliceState, CaseReducers>;
}
