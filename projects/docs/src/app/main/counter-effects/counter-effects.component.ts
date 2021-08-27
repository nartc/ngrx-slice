// @ts-ignore
import { default as componentTs } from '!!raw-loader!./examples/component.ts';
// @ts-ignore
import { default as effectTs } from '!!raw-loader!./examples/effect.ts';
// @ts-ignore
import { default as moduleTs } from '!!raw-loader!./examples/module.ts';
// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./examples/slice.ts';
// @ts-ignore
import { default as templateHtml } from '!!raw-loader!./examples/template.html';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CounterEffectsActions,
  CounterEffectsSelectors,
} from './counter-effects.slice';

@Component({
  selector: 'docs-counter-effects',
  template: `
    <tui-doc-example
      heading="Counter with Effects Example"
      id="counter-effects"
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

      <button
        tuiButton
        type="button"
        appearance="outline"
        size="s"
        (click)="onMultiply()"
      >
        Multiply by {{ lastMultiplier }}
      </button>
    </tui-doc-example>

    <p>
      In this
      <strong>Effects</strong>
      example, we introduce a couple of additional features that
      <code>ngrx-slice</code>
      has
    </p>
    <ul class="tui-list">
      <li class="tui-list__item">Async Case Reducer</li>
      <li class="tui-list__item">Typed Action</li>
      <li class="tui-list__item">Noop Reducers</li>
    </ul>

    <h3>Async Case Reducer</h3>
    <p>
      In previous examples, we have seen
      <code>increment: state => {{ '{/*...*/}' }}</code>
      . This is a
      <strong>Case Reducer</strong>
      which is a reducer function that updates state . In addition,
      <code>ngrx-slice</code>
      provides
      <strong>Async Case Reducer</strong>
      to define group of cases that are highly related to each other.
    </p>
    <p>
      An
      <strong>Async Case Reducer</strong>
      is an object with the shape of
      <code>
        {{
          '{ success: CaseReducer, trigger?: CaseReducer, failure?: CaseReducer, cancel?: CaseReducer, clear?: CaseReducer }'
        }}
      </code>
      where the
      <code>success</code>
      case is
      <strong>required</strong>
      .
    </p>

    <h3>Typed Action</h3>
    <p>
      Since
      <strong>Action Creators</strong>
      are generated from
      <strong>Case Reducers</strong>
      , there is a need to provide a
      <em>type</em>
      for
      <strong>Actions with Payload</strong>
    </p>
    <p>
      <code>ngrx-slice</code>
      provides
      <code>PayloadAction</code>
      type to do so.
    </p>
    <ul class="tui-list">
      <li class="tui-list__item">
        <code>increment: state => {{ '{/*...*/}' }}</code>
        gives
        <code>actions.increment()</code>
      </li>
      <li class="tui-list__item">
        <code>
          increment: (state, action: PayloadAction<{{ '{ value: number }' }}>)
          => {{ '{/*...*/}' }}
        </code>
        gives
        <code>actions.increment({{ '{ value: 5 }' }})</code>
      </li>
    </ul>

    <h3>Noop Reducers</h3>
    <p>
      Not all
      <strong>Actions</strong>
      need to be handled by
      <strong>Reducers</strong>
      . Sometimes, we have some
      <strong>Actions</strong>
      as
      <em>triggers</em>
      for
      <strong>Side Effects</strong>
      . For these situations,
      <code>ngrx-slice</code>
      provides the
      <code>noopReducer<{{ 'ActionPayload, SliceState' }}>()</code>
      which does nothing rather than making itself available as a generated
      action.
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
export class CounterEffectsComponent {
  readonly count$ = this.store.select(CounterEffectsSelectors.selectValue);
  readonly incrementCount$ = this.store.select(
    CounterEffectsSelectors.selectIncrementCount
  );
  readonly decrementCount$ = this.store.select(
    CounterEffectsSelectors.selectDecrementCount
  );

  lastMultiplier = CounterEffectsComponent.getRandom();

  readonly examples = {
    'slice.ts': sliceTs,
    'effect.ts': effectTs,
    'component.ts': componentTs,
    'template.html': templateHtml,
    'module.ts': moduleTs,
  };

  constructor(private readonly store: Store) {}

  onDecrement() {
    this.store.dispatch(CounterEffectsActions.decrement());
  }

  onIncrement() {
    this.store.dispatch(CounterEffectsActions.increment());
  }

  onMultiply() {
    this.store.dispatch(
      CounterEffectsActions.multiplyBy.trigger({
        multiplier: this.lastMultiplier,
      })
    );
    this.lastMultiplier = CounterEffectsComponent.getRandom();
  }

  private static getRandom() {
    return Math.floor(Math.random() * 9 + 2);
  }
}
