import {
  createSingleArgumentStateOperator,
  createStateOperator,
} from './state-adapter';
import type {
  EntityId,
  EntityState,
  EntityStateAdapter,
  IdSelector,
  Update,
} from './typings';
import {
  ensureEntitiesArray,
  selectIdValue,
  splitAddedUpdatedEntities,
} from './utils';

export function createUnsortedStateAdapter<TData>(
  selectId: IdSelector<TData>
): EntityStateAdapter<TData> {
  type TState = EntityState<TData>;

  function addOneMutably(entity: TData, state: TState): void {
    const key = selectIdValue(entity, selectId);

    if (key in state.entities) return;

    state.ids.push(key);
    state.entities[key] = entity;
  }

  function addManyMutably(
    entities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    entities = ensureEntitiesArray(entities);

    for (const entity of entities) {
      addOneMutably(entity, state);
    }
  }

  function setOneMutably(entity: TData, state: TState): void {
    const key = selectIdValue(entity, selectId);
    if (!(key in state.entities)) {
      state.ids.push(key);
    }

    state.entities[key] = entity;
  }

  function setManyMutably(
    entities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    entities = ensureEntitiesArray(entities);

    for (const entity of entities) {
      setOneMutably(entity, state);
    }
  }

  function setAllMutably(
    entities: readonly TData[] | Record<EntityId, TData>,
    state: TState
  ): void {
    entities = ensureEntitiesArray(entities);

    state.ids = [];
    state.entities = {};

    addManyMutably(entities, state);
  }

  function removeManyMutably(keys: readonly EntityId[], state: TState): void {
    let didMutate = false;

    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key];
        didMutate = true;
      }
    });

    if (didMutate) {
      state.ids = state.ids.filter((id) => id in state.entities);
    }
  }

  function removeOneMutably(key: EntityId, state: TState): void {
    return removeManyMutably([key], state);
  }

  function removeAllMutably(state: TState): void {
    Object.assign(state, {
      ids: [],
      entities: {},
    });
  }

  function takeNewKey(
    keys: { [id: string]: EntityId },
    update: Update<TData>,
    state: TState
  ): boolean {
    const original = state.entities[update.id];
    const updated: TData = Object.assign({}, original, update.changes);
    const newKey = selectIdValue(updated, selectId);
    const hasNewKey = newKey !== update.id;

    if (hasNewKey) {
      keys[update.id] = newKey;
      delete state.entities[update.id];
    }

    state.entities[newKey] = updated;

    return hasNewKey;
  }

  function updateManyMutably(
    updates: ReadonlyArray<Update<TData>>,
    state: TState
  ): void {
    const newKeys: { [id: string]: EntityId } = {};

    const updatesPerEntity: { [id: string]: Update<TData> } = {};

    updates.forEach((update) => {
      // Only apply updates to entities that currently exist
      if (update.id in state.entities) {
        // If there are multiple updates to one entity, merge them together
        updatesPerEntity[update.id] = {
          id: update.id,
          // Spreads ignore falsy values, so this works even if there isn't
          // an existing update already at this key
          changes: {
            ...(updatesPerEntity[update.id]
              ? updatesPerEntity[update.id].changes
              : null),
            ...update.changes,
          },
        };
      }
    });

    updates = Object.values(updatesPerEntity);

    const didMutateEntities = updates.length > 0;

    if (didMutateEntities) {
      const didMutateIds =
        updates.filter((update) => takeNewKey(newKeys, update, state)).length >
        0;

      if (didMutateIds) {
        state.ids = state.ids.map((id) => newKeys[id] || id);
      }
    }
  }

  function updateOneMutably(update: Update<TData>, state: TState): void {
    return updateManyMutably([update], state);
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

  function upsertOneMutably(entity: TData, state: TState): void {
    return upsertManyMutably([entity], state);
  }

  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably),
  } as EntityStateAdapter<TData>;
}
