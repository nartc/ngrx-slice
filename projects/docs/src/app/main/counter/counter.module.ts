import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { UiBlankLinkModule } from '../../shared/ui-blank-link/ui-blank-link.module';
import { CounterComponent } from './counter.component';
import { counterFeature } from './counter.slice';

@NgModule({
  declarations: [CounterComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterFeature),
    TuiButtonModule,
    TuiGroupModule,
    TuiAddonDocModule,
    UiBlankLinkModule,
  ],
  exports: [CounterComponent],
})
export class CounterModule {}
