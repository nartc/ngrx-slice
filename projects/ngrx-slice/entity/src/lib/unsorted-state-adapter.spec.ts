import { createSliceEntityAdapter } from './create-slice-entity-adapter';
import {
  publishSliceTodo,
  Todo,
  writeSliceTodo,
  writeTestTodo,
} from './todo.spec.fixture';
import { EntityAdapter, EntityState } from './typings';
import { createUnsortedStateAdapter } from './unsorted-state-adapter';

describe(createUnsortedStateAdapter.name, () => {
  let adapter: EntityAdapter<Todo>;
  let state: EntityState<Todo>;

  beforeEach(() => {
    adapter = createSliceEntityAdapter({
      selectId: (model) => model.id,
    });

    state = { ids: [], entities: {} };
  });

  it('should let you add one entity to the state', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    expect(addOneResult).toEqual({
      ids: [writeSliceTodo.id],
      entities: {
        [writeSliceTodo.id]: writeSliceTodo,
      },
    });
  });

  it('should not change state if you add the same entity more than once', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const reAddResult = adapter.addOne(addOneResult, writeSliceTodo);

    expect(reAddResult).toBe(addOneResult);
  });

  it('should let you add many entities to the state', () => {
    const addManyResult = adapter.addMany(state, [
      writeSliceTodo,
      writeTestTodo,
    ]);

    expect(addManyResult).toEqual({
      ids: [writeSliceTodo.id, writeTestTodo.id],
      entities: {
        [writeSliceTodo.id]: writeSliceTodo,
        [writeTestTodo.id]: writeTestTodo,
      },
    });
  });

  it('should let you set many entities on the state', () => {
    const addManyResult = adapter.addMany(state, [
      writeSliceTodo,
      writeTestTodo,
    ]);

    const sliceChange = { title: 'Wrote Slice' };
    const testChange = { title: 'Wrote Test' };

    const setManyResult = adapter.setMany(addManyResult, [
      { ...writeSliceTodo, ...sliceChange },
      { ...writeTestTodo, ...testChange },
    ]);

    expect(setManyResult).toEqual({
      ids: [writeSliceTodo.id, writeTestTodo.id],
      entities: {
        [writeSliceTodo.id]: {
          ...writeSliceTodo,
          ...sliceChange,
        },
        [writeTestTodo.id]: {
          ...writeTestTodo,
          ...testChange,
        },
      },
    });
  });

  it('should remove existing and add new ones with setAll', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);

    const setAllResult = adapter.setAll(addOneResult, [
      writeTestTodo,
      publishSliceTodo,
    ]);

    expect(setAllResult).toEqual({
      ids: [writeTestTodo.id, publishSliceTodo.id],
      entities: {
        [writeTestTodo.id]: writeTestTodo,
        [publishSliceTodo.id]: publishSliceTodo,
      },
    });
  });

  it('should let you remove entity from the state', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const removeOneResult = adapter.removeOne(addOneResult, writeSliceTodo.id);

    expect(removeOneResult).toEqual(state);
  });

  it('should let you remove many entities from the state', () => {
    const addManyResult = adapter.addMany(state, [
      writeSliceTodo,
      writeTestTodo,
      publishSliceTodo,
    ]);
    const removeManyResult = adapter.removeMany(addManyResult, [
      writeSliceTodo.id,
      publishSliceTodo.id,
    ]);

    expect(removeManyResult).toEqual({
      ids: [writeTestTodo.id],
      entities: {
        [writeTestTodo.id]: writeTestTodo,
      },
    });
  });

  it('should let you remove all entities from the state', () => {
    const setAllResult = adapter.setAll(state, [
      writeSliceTodo,
      writeTestTodo,
      publishSliceTodo,
    ]);

    const removeAllResult = adapter.removeAll(setAllResult);

    expect(removeAllResult).toEqual(state);
  });

  it('should let you update one entity in the state', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const updateOneResult = adapter.updateOne(addOneResult, {
      id: writeSliceTodo.id,
      changes: { title: 'Wrote Slice' },
    });

    expect(updateOneResult).toEqual({
      ids: [writeSliceTodo.id],
      entities: {
        [writeSliceTodo.id]: { ...writeSliceTodo, title: 'Wrote Slice' },
      },
    });
  });

  it('should not update state when you update an entity that is not in the state', () => {
    const updateOneResult = adapter.updateOne(state, {
      id: writeSliceTodo.id,
      changes: { title: 'Wrote Slice' },
    });

    expect(updateOneResult).toEqual(state);
  });

  it('should let you update entity id', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const updateOneResult = adapter.updateOne(addOneResult, {
      id: writeSliceTodo.id,
      changes: { id: '11' },
    });

    expect(updateOneResult).toEqual({
      ids: ['11'],
      entities: {
        '11': { ...writeSliceTodo, id: '11' },
      },
    });
  });

  it('should let you update many entities in the state', () => {
    const setAllResult = adapter.setAll(state, [
      writeSliceTodo,
      writeTestTodo,
      publishSliceTodo,
    ]);

    const updateManyResult = adapter.updateMany(setAllResult, [
      { id: writeSliceTodo.id, changes: { title: 'Wrote Slice' } },
      { id: writeTestTodo.id, changes: { title: 'Wrote Test' } },
    ]);

    expect(updateManyResult).toEqual({
      ids: [writeSliceTodo.id, writeTestTodo.id, publishSliceTodo.id],
      entities: {
        [publishSliceTodo.id]: publishSliceTodo,
        [writeSliceTodo.id]: { ...writeSliceTodo, title: 'Wrote Slice' },
        [writeTestTodo.id]: { ...writeTestTodo, title: 'Wrote Test' },
      },
    });
  });

  it('should let you add an entity with upsertOne', () => {
    const upsertOneResult = adapter.upsertOne(state, writeSliceTodo);
    expect(upsertOneResult).toEqual({
      ids: [writeSliceTodo.id],
      entities: {
        [writeSliceTodo.id]: writeSliceTodo,
      },
    });
  });

  it('should let you update an entity with upsertOne', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const upsertOneResult = adapter.upsertOne(addOneResult, {
      ...writeSliceTodo,
      title: 'Wrote Slice',
    });

    expect(upsertOneResult).toEqual({
      ids: [writeSliceTodo.id],
      entities: {
        [writeSliceTodo.id]: { ...writeSliceTodo, title: 'Wrote Slice' },
      },
    });
  });

  it('should let you add and update entities with upsertMany', () => {
    const addOneResult = adapter.addOne(state, writeSliceTodo);
    const upsertManyResult = adapter.upsertMany(addOneResult, [
      { ...writeSliceTodo, title: 'Wrote Slice' },
      writeTestTodo,
    ]);

    expect(upsertManyResult).toEqual({
      ids: [writeSliceTodo.id, writeTestTodo.id],
      entities: {
        [writeSliceTodo.id]: { ...writeSliceTodo, title: 'Wrote Slice' },
        [writeTestTodo.id]: writeTestTodo,
      },
    });
  });
});
