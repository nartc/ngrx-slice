import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import {TuiButtonModule, TuiGroupModule} from "@taiga-ui/core";
import { UiBlankLinkModule } from '../../shared/ui-blank-link/ui-blank-link.module';
import { CounterEffectsComponent } from './counter-effects.component';
import { counterFeature } from './counter-effects.slice';
import { CounterEffect } from './counter.effect';

@NgModule({
  declarations: [CounterEffectsComponent],
  imports: [
    CommonModule,
    TuiAddonDocModule,
    UiBlankLinkModule,
    StoreModule.forFeature(counterFeature),
    EffectsModule.forFeature([CounterEffect]),
    TuiButtonModule,
    TuiGroupModule,
  ],
  exports: [CounterEffectsComponent],
})
export class CounterEffectsModule {}
