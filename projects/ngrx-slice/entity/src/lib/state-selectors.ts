import { createSelector } from '@ngrx/store';
import type {
  Dictionary,
  EntityId,
  EntitySelectors,
  EntityState,
} from './typings';

export function createSelectorsFactory<TData>() {
  function getSelectors(): EntitySelectors<TData, EntityState<TData>>;
  function getSelectors<TState>(
    selectState: (state: TState) => EntityState<TData>
  ): EntitySelectors<TData, TState>;
  function getSelectors(
    selectState?: (state: any) => EntityState<TData>
  ): EntitySelectors<TData, any> {
    const selectIds = (state: any) => state.ids as EntityId[];
    const selectEntities = (state: any) => state.entities as Dictionary<TData>;

    const selectAll = createSelector(
      selectIds,
      selectEntities,
      (ids, entities) => ids.map((id) => entities[id]) as TData[]
    );

    const selectTotal = createSelector(selectIds, (ids) => ids.length);

    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
      } as EntitySelectors<TData, any>;
    }

    return {
      selectIds: createSelector(selectState, selectIds),
      selectEntities: createSelector(selectState, selectEntities),
      selectAll: createSelector(selectState, selectAll),
      selectTotal: createSelector(selectState, selectTotal),
    } as EntitySelectors<TData, any>;
  }

  return { getSelectors };
}
