import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './component';
import { CounterEffect } from './effect';
import { CounterFeature } from './slice';

@NgModule({
  imports: [
    StoreModule.forFeature(CounterFeature),
    EffectsModule.forFeature([CounterEffect]),
  ],
  declarations: [CounterComponent],
})
export class CounterModule {}
