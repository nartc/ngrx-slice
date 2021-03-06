import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { TuiButtonModule, TuiGroupModule, TuiLinkModule } from '@taiga-ui/core';
import { UiBlankLinkModule } from '../../shared/ui-blank-link/ui-blank-link.module';
import { CounterComponent } from './counter.component';
import { CounterFeature } from './counter.slice';

@NgModule({
  declarations: [CounterComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(CounterFeature),
    TuiButtonModule,
    TuiGroupModule,
    TuiAddonDocModule,
    UiBlankLinkModule,
    TuiLinkModule,
  ],
  exports: [CounterComponent],
})
export class CounterModule {}
