import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiAddonDocModule} from "@taiga-ui/addon-doc";
import { ExternalActionsComponent } from './external-actions.component';



@NgModule({
  declarations: [ExternalActionsComponent],
  imports: [CommonModule, TuiAddonDocModule],
  exports: [ExternalActionsComponent],
})
export class ExternalActionsModule {}
