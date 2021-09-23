import type { EntityState } from './typings';

function getInitialEntityState<TState>(): EntityState<TState> {
  return {
    ids: [],
    entities: {},
  };
}

export function createInitialStateFactory<TState>() {
  function getInitialState(): EntityState<TState>;
  function getInitialState<TAdditionalState extends object>(
    additionalState: TAdditionalState
  ): EntityState<TState> & TAdditionalState;
  function getInitialState(additionalState: Record<string, unknown> = {}) {
    return Object.assign(
      getInitialEntityState(),
      additionalState
    ) as EntityState<TState>;
  }

  return { getInitialState };
}
