import createNextState, { isDraft } from 'immer';
import type { PayloadAction } from 'ngrx-slice';
import type { EntityState, PreventAny } from './typings';

export function createSingleArgumentStateOperator<TData>(
  mutator: (state: EntityState<TData>) => void
) {
  const operator = createStateOperator((_, state: EntityState<TData>) =>
    mutator(state)
  );

  return function operation<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>
  ): TState {
    return operator(state as TState, undefined) as TState;
  };
}

export function createStateOperator<TData, TArg>(
  mutator: (arg: TArg, state: EntityState<TData>) => void
) {
  return function operation<TState extends EntityState<TData>>(
    state: TState,
    arg: TArg | PayloadAction
  ) {
    function isPayloadActionArg(
      arg: TArg | PayloadAction
    ): arg is PayloadAction {
      return typeof arg === 'object' && 'type' in arg;
    }

    const runMutator = (draft: EntityState<TData>) => {
      if (isPayloadActionArg(arg)) {
        const { type: _removedType, _payload: _removedPayload, ...rest } = arg;
        if (Object.keys(rest).length > 1) {
          mutator(rest as TArg, draft);
        } else {
          mutator(Object.values(rest).pop(), draft);
        }
      } else {
        mutator(arg, draft);
      }
    };

    if (isDraft(state)) {
      runMutator(state);
      return state;
    }

    return createNextState(state, runMutator);
  };
}
