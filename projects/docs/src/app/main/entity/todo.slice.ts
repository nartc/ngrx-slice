import { createSelector } from '@ngrx/store';
import { createSlice, PayloadAction } from 'ngrx-slice';
import { createSliceEntityAdapter } from 'ngrx-slice/entity';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export const todoAdapter = createSliceEntityAdapter<Todo>({
  sortComparer: (a, b) => a.text.localeCompare(b.text),
});

export const {
  actions: TodoActions,
  selectors,
  ...TodoFeature
} = createSlice({
  name: 'todo',
  initialState: todoAdapter.getInitialState(),
  reducers: {
    todoAdded: todoAdapter.addOne,
    toggleComplete: (state, { todo }: PayloadAction<{ todo: Todo }>) => {
      todoAdapter.updateOne(state, {
        id: todo.id,
        changes: {
          isCompleted: !todo.isCompleted,
        },
      });
    },
  },
});

export const TodoSelectors = {
  ...selectors,
  selectAll: createSelector(
    selectors.selectTodoState,
    todoAdapter.getSelectors().selectAll
  ),
};
