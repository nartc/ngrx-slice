// @ts-ignore
import { default as componentTs } from '!!raw-loader!./examples/component.ts';
// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./examples/slice.ts';
// @ts-ignore
import { default as templateHtml } from '!!raw-loader!./examples/template.html';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions, CounterSelectors } from './counter.slice';

@Component({
  selector: 'docs-counter',
  template: `
    <tui-doc-example
      heading="Counter Example"
      id="counter"
      [content]="examples"
    >
      <div tuiGroup>
        <button
          tuiIconButton
          type="button"
          appearance="outline"
          size="s"
          (click)="onDecrement()"
        >
          -
        </button>
        <div class="count">
          <span class="tui-group__inherit-item">
            Count: {{ count$ | async }}
          </span>
        </div>
        <button
          tuiIconButton
          type="button"
          appearance="outline"
          size="s"
          (click)="onIncrement()"
        >
          +
        </button>
      </div>

      <p>You have pressed increment: {{ incrementCount$ | async }} times</p>
      <p>You have pressed decrement: {{ decrementCount$ | async }} times</p>
    </tui-doc-example>

    <p>
      This is the most minimal-simple example of a
      <strong>Counter</strong>
      . Let's take a look again at
      <code>slice.ts</code>
    </p>

    <tui-doc-code filename="slice.ts" [code]="sliceCode"></tui-doc-code>

    <p>
      A
      <strong>slice</strong>
      represents a piece of the
      <strong>global state</strong>
      .
      <code>createSlice</code>
      works based on two main things:
    </p>
    <ul class="tui-list">
      <li class="tui-list__item">
        <code>reducers</code>
        : used to generate the
        <code>ActionCreators</code>
      </li>
      <li class="tui-list__item">
        <code>initialState</code>
        : used to generate the
        <code>MemoizedSelectors</code>
      </li>
    </ul>

    <h3>Reducers - ActionCreators</h3>
    <p>
      With
      <code>createSlice</code>
      , we express the
      <strong>State Updaters</strong>
      via
      <code>reducers</code>
      . Each case defined in
      <code>reducers</code>
      will act as the name of the generated
      <code>ActionCreator</code>
      respectively
    </p>
    <p>
      For example,
      <code>reducers.increment</code>
      will allow
      <code>createSlice</code>
      to generate
      <code>actions.increment()</code>
    </p>

    <h3>Initial State - MemoizedSelectors</h3>
    <p>
      On the other hand, the
      <code>initialState</code>
      will be used to generate the
      <strong>Selectors</strong>
      . If your
      <code>initialState</code>
      is an empty object
      <code>{{ '{}' }}</code>
      , then no
      <strong>Selectors</strong>
      will be generated except for the
      <strong>Feature Selector</strong>
    </p>
    <p>
      For example,
      <code>initialState</code>
      in the example above will generate
      <code>selectors.selectCounter</code>
      (
      <strong>FeatureSelector</strong>
      via
      <code>createFeatureSelector</code>
      ),
      <code>selectors.selectValue</code>
      (
      <code>initialState.value</code>
      via
      <code>createSelector</code>
      ),
      <code>selectors.selectIncrementCount</code>
      , and
      <code>selectors.selectDecrementCount</code>
    </p>

    <h3>Mutability</h3>
    <p>
      <code>createSlice</code>
      makes use of
      <code>Immer</code>
      under the hood to provide simpler
      <strong>State Updates</strong>
      operations. Normally,
      <em>mutating</em>
      state is not allowed but as you notice, we
      <strong>mutate</strong>
      our
      <code>CounterState</code>
      with
      <code>state.value++</code>
      . This is all thanks to
      <code>Immer</code>
      . For more complex update patterns, please check out
      <a tuiLink href="https://immerjs.github.io/immer/update-patterns/">
        Immer documentations
      </a>
    </p>
  `,
  styles: [
    `
      div.count {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class CounterComponent {
  readonly count$ = this.store.select(CounterSelectors.selectValue);
  readonly incrementCount$ = this.store.select(
    CounterSelectors.selectIncrementCount
  );
  readonly decrementCount$ = this.store.select(
    CounterSelectors.selectDecrementCount
  );

  readonly sliceCode = sliceTs;

  readonly examples = {
    'slice.ts': sliceTs,
    'component.ts': componentTs,
    'template.html': templateHtml,
  };

  constructor(private readonly store: Store) {}

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }
}
