import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CounterActions, CounterSelectors } from './counter-effects.slice';

@Injectable()
export class CounterEffect {
  readonly multiply = createEffect(() =>
    this.actions$.pipe(
      // Listen for multiplyBy.trigger
      ofType(CounterActions.multiplyBy.trigger),
      // get the latest count value
      concatLatestFrom(() => this.store.select(CounterSelectors.selectValue)),
      // switchMap to a side-effect (timer)
      switchMap(([{ multiplier }, currentValue]) =>
        // 1s timer to simulate async task
        timer(1000).pipe(
          map(() =>
            // multiply the latest count with the new multiplier
            // dispatch multiplyBy.success
            CounterActions.multiplyBy.success({
              value: currentValue * multiplier,
            })
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
