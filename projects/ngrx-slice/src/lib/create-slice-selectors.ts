import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import type { NestedSelectors } from './typings';
import { classify, isDictionary } from './utils';

export function createSliceSelectors<SliceState extends object>(
  initialState: SliceState,
  featureSelector: MemoizedSelector<object, SliceState>
): NestedSelectors<SliceState> {
  const nestedKeys = (
    isDictionary(initialState) ? Object.keys(initialState) : []
  ) as Array<keyof SliceState & string>;

  return nestedKeys.reduce(
    (nestedSelectors, nestedKey) => ({
      ...nestedSelectors,
      [`select${classify(nestedKey)}`]: createSelector(
        featureSelector,
        (parentState) => parentState[nestedKey]
      ),
    }),
    {}
  ) as NestedSelectors<SliceState>;
}
