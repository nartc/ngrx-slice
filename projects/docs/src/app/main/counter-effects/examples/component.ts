import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions, CounterSelectors } from './slice';

@Component({
  selector: 'counter',
  templateUrl: 'template.html',
})
export class CounterComponent {
  readonly count$ = this.store.select(CounterSelectors.selectValue);
  readonly incrementCount$ = this.store.select(
    CounterSelectors.selectIncrementCount
  );
  readonly decrementCount$ = this.store.select(
    CounterSelectors.selectDecrementCount
  );

  lastMultiplier = this.getRandom();

  constructor(private readonly store: Store) {}

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }

  onMultiply() {
    this.store.dispatch(
      CounterActions.multiplyBy.trigger({ multiplier: this.lastMultiplier })
    );
    this.lastMultiplier = this.getRandom();
  }

  private getRandom() {
    return Math.floor(Math.random() * 9 + 2);
  }
}
