import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { ActionTypeComponent } from './action-type.component';

@NgModule({
  declarations: [ActionTypeComponent],
  imports: [CommonModule, TuiAddonDocModule],
  exports: [ActionTypeComponent],
})
export class ActionTypeModule {}
