import { createSelector } from '@ngrx/store';
import { createSlice } from 'ngrx-slice';
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
    toggleComplete: todoAdapter.updateOne,
  },
});

export const TodoSelectors = {
  ...selectors,
  selectAll: createSelector(
    selectors.selectTodoState,
    todoAdapter.getSelectors().selectAll
  ),
};
