import { createSliceEntityAdapter } from './create-slice-entity-adapter';
import { createSelectorsFactory } from './state-selectors';
import {
  publishSliceTodo,
  Todo,
  writeSliceTodo,
  writeTestTodo,
} from './todo.spec.fixture';
import { EntityAdapter, EntitySelectors, EntityState } from './typings';

describe(createSelectorsFactory.name, () => {
  interface State {
    todos: EntityState<Todo>;
  }

  let adapter: EntityAdapter<Todo>;
  let selectors: EntitySelectors<Todo, State>;
  let state: State;

  beforeEach(() => {
    adapter = createSliceEntityAdapter<Todo>({ selectId: (model) => model.id });
    state = {
      todos: adapter.setAll(adapter.getInitialState(), [
        writeSliceTodo,
        writeTestTodo,
        publishSliceTodo,
      ]),
    };
    selectors = adapter.getSelectors((state) => state.todos);
  });

  it('should let you select the ids', () => {
    const ids = selectors.selectIds(state);
    expect(ids).toEqual(state.todos.ids);
  });

  it('should let you select the entities', () => {
    const entities = selectors.selectEntities(state);
    expect(entities).toEqual(state.todos.entities);
  });

  it('should let you select the total', () => {
    const total = selectors.selectTotal(state);
    expect(total).toEqual(state.todos.ids.length);
  });

  it('should let you select the list', () => {
    const todos = selectors.selectAll(state);
    expect(todos).toEqual([writeSliceTodo, writeTestTodo, publishSliceTodo]);
  });
});
