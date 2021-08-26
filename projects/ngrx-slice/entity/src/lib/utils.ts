import { isDevMode } from '@angular/core';
import type { EntityId, EntityState, IdSelector, Update } from './typings';

export function selectIdValue<TData>(
  entity: TData,
  selectId: IdSelector<TData>
): EntityId {
  const key = selectId(entity);

  if (isDevMode() && key === undefined) {
    console.warn(
      'The entity passed to the `selectId` implementation returned undefined.',
      'You should probably provide your own `selectId` implementation.',
      'The entity that was passed:',
      entity,
      'The `selectId` implementation:',
      selectId.toString()
    );
  }

  return key;
}

export function ensureEntitiesArray<TData>(
  entities: readonly TData[] | Record<EntityId, TData>
): readonly TData[] {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities);
  }

  return entities;
}

export function splitAddedUpdatedEntities<TData>(
  newEntities: readonly TData[] | Record<EntityId, TData>,
  selectId: IdSelector<TData>,
  state: EntityState<TData>
): [TData[], Update<TData>[]] {
  newEntities = ensureEntitiesArray(newEntities);

  const added: TData[] = [];
  const updated: Update<TData>[] = [];

  for (const entity of newEntities) {
    const id = selectIdValue(entity, selectId);
    if (id in state.entities) {
      updated.push({ id, changes: entity });
    } else {
      added.push(entity);
    }
  }
  return [added, updated];
}
