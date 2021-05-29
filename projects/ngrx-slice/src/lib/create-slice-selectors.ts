import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import type { NestedSelectors } from './typings';
import { capitalize, isDictionary } from './utils';

export function createSliceSelectors<
  AppState extends Record<string, any>,
  SliceState
>(
  initialState: SliceState,
  featureSelector: MemoizedSelector<AppState, SliceState>
): NestedSelectors<AppState, SliceState> {
  const nestedKeys = (
    isDictionary(initialState) ? Object.keys(initialState) : []
  ) as Array<keyof SliceState & string>;

  return nestedKeys.reduce(
    (nestedSelectors, nestedKey) => ({
      ...nestedSelectors,
      [`select${capitalize(nestedKey)}`]: createSelector(
        featureSelector,
        (parentState) => parentState[nestedKey]
      ),
    }),
    {} as NestedSelectors<AppState, SliceState>
  );
}
