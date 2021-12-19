import { createStateOperator } from './state-adapter';
import type {
  Comparer,
  EntityId,
  EntityState,
  EntityStateAdapter,
  IdSelector,
  Update,
} from './typings';
import { createUnsortedStateAdapter } from './unsorted-state-adapter';
import {
  ensureEntitiesArray,
  selectIdValue,
  splitAddedUpdatedEntities,
} from './utils';

export function createSortedStateAdapter<TData>(
  selectId: IdSelector<TData>,
  sortComparer: Comparer<TData>
): EntityStateAdapter<TData> {
  type TState = EntityState<TData>;

  const { removeOne, removeMany, removeAll } =
    createUnsortedStateAdapter(selectId);

  function addOneMutably(entity: TData, state: TState): void {
    return addManyMutably([entity], state);
  }

  function addManyMutably(
    newEntities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    newEntities = ensureEntitiesArray(newEntities);

    const models = newEntities.filter(
      (model) => !(selectIdValue(model, selectId) in state.entities)
    );

    if (models.length !== 0) {
      merge(models, state);
    }
  }

  function setOneMutably(entity: TData, state: TState): void {
    return setManyMutably([entity], state);
  }

  function setManyMutably(
    newEntities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    newEntities = ensureEntitiesArray(newEntities);
    if (newEntities.length !== 0) {
      merge(newEntities, state);
    }
  }

  function setAllMutably(
    newEntities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    newEntities = ensureEntitiesArray(newEntities);
    state.entities = {};
    state.ids = [];

    addManyMutably(newEntities, state);
  }

  function updateOneMutably(update: Update<TData>, state: TState): void {
    return updateManyMutably([update], state);
  }

  function takeUpdatedModel(
    models: TData[],
    update: Update<TData>,
    state: TState
  ): boolean {
    if (!(update.id in state.entities)) {
      return false;
    }

    const original = state.entities[update.id];
    const updated = Object.assign({}, original, update.changes);
    const newKey = selectIdValue(updated, selectId);

    delete state.entities[update.id];

    models.push(updated);

    return newKey !== update.id;
  }

  function updateManyMutably(
    updates: ReadonlyArray<Update<TData>>,
    state: TState
  ): void {
    const models: TData[] = [];

    updates.forEach((update) => takeUpdatedModel(models, update, state));

    if (models.length !== 0) {
      merge(models, state);
    }
  }

  function upsertOneMutably(entity: TData, state: TState): void {
    return upsertManyMutably([entity], state);
  }

  function upsertManyMutably(
    newEntities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    const [added, updated] = splitAddedUpdatedEntities<TData>(
      newEntities,
      selectId,
      state
    );

    updateManyMutably(updated, state);
    addManyMutably(added, state);
  }

  function areArraysEqual(a: readonly unknown[], b: readonly unknown[]) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length && i < b.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }

  function merge(models: readonly TData[], state: TState): void {
    // Insert/overwrite all new/updated
    models.forEach((model) => {
      state.entities[selectId(model)] = model;
    });

    const allEntities = Object.values(state.entities) as TData[];

    allEntities.sort(sortComparer);

    const newSortedIds = allEntities.map(selectId);
    const { ids } = state;

    if (!areArraysEqual(ids, newSortedIds)) {
      state.ids = newSortedIds;
    }
  }

  return {
    removeOne,
    removeMany,
    removeAll,
    addOne: createStateOperator(addOneMutably),
    updateOne: createStateOperator(updateOneMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    addMany: createStateOperator(addManyMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertMany: createStateOperator(upsertManyMutably),
  } as EntityStateAdapter<TData>;
}
