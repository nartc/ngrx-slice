import { createInitialStateFactory } from './entity-state';
import { createSortedStateAdapter } from './sorted-state-adapter';
import { createSelectorsFactory } from './state-selectors';
import {
  Comparer,
  EntityAdapter,
  EntityDefinition,
  EntityId,
  IdSelector,
} from './typings';
import { createUnsortedStateAdapter } from './unsorted-state-adapter';

export function createSliceEntityAdapter<TData>(
  options: {
    selectId?: IdSelector<TData>;
    sortComparer?: false | Comparer<TData>;
  } = {}
): EntityAdapter<TData> {
  const { selectId, sortComparer }: EntityDefinition<TData> = {
    sortComparer: false,
    selectId: (instance) =>
      (instance as unknown as Record<string, EntityId>).id,
    ...options,
  };

  const stateFactory = createInitialStateFactory<TData>();
  const selectorsFactory = createSelectorsFactory<TData>();
  const stateAdapter = sortComparer
    ? createSortedStateAdapter<TData>(selectId, sortComparer)
    : createUnsortedStateAdapter<TData>(selectId);

  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter,
  };
}
