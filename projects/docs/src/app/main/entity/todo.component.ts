// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./todo.slice.ts';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo, TodoActions, TodoSelectors } from './todo.slice';

@Component({
  selector: 'docs-todo',
  template: `
    <tui-doc-example heading="Entity Example w/ Todo" id="todo-entity">
      <tui-input [(ngModel)]="text">Enter todo...</tui-input>
      <br />
      <button tuiButton (click)="addTodo()">Add</button>

      <ul class="tui-list">
        <li
          class="tui-list__item"
          *ngFor="let todo of todos$ | async"
          [style.cursor]="'pointer'"
          [style.textDecoration]="todo.isCompleted ? 'line-through' : 'auto'"
          (click)="toggleComplete(todo)"
        >
          {{ todo.text }}
        </li>
      </ul>
    </tui-doc-example>
    <p>
      Similar to
      <code>@ngrx/entity</code>
      ,
      <code>ngrx-slice</code>
      also exposes a way to deal with
      <code>Entity</code>
      which is a function called
      <code>createSliceEntityAdapter()</code>
      . This function is exported from
      <code>ngrx-slice/entity</code>
    </p>

    <p>
      The signature of
      <code>createSliceEntityAdapter</code>
      is exactly the same as
      <code>createEntityAdapter</code>
      from
      <code>@ngrx/entity</code>
    </p>
    <ul class="tui-list">
      <li class="tui-list__item">
        <code>selectId</code>
        : an ID selector function. Default to:
        <code>(entity) => entity.id</code>
        . If your entity uses a different field as the ID rather than
        <code>id</code>
        , you need to provide
        <code>selectId</code>
      </li>
      <li class="tui-list__item">
        <code>sortComparer</code>
        : a comparer function which will be used to determine the order of
        <code>entityState.ids</code>
        . Default to:
        <code>false</code>
      </li>
    </ul>

    <tui-doc-code [code]="sliceTs"></tui-doc-code>
    <p>
      Same idea as
      <code>createSlice</code>
      , you do not have to return a new state in your reducers. Adapter methods
      are invoked with Immer's
      <code>Draft</code>
      .
    </p>
    <p>
      You can either create your
      <code>CaseReducer</code>
      like usual and invoke the Adapter methods, or you can just use the Adapter
      methods as your
      <code>CaseReducer</code>
      . Like:
      <code>todoAdded: todoAdapter.addOne</code>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todos$ = this.store.select(TodoSelectors.selectAll);

  text = '';

  sliceTs = sliceTs;

  constructor(private readonly store: Store) {}

  addTodo() {
    this.store.dispatch(
      TodoActions.todoAdded({
        entity: {
          id: Date.now(),
          text: this.text,
          isCompleted: false,
        },
      })
    );
    this.text = '';
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(TodoActions.toggleComplete({ todo }));
  }
}
