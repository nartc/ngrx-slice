import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiNotificationModule} from "@taiga-ui/core";
import { InstallationComponent } from './installation.component';



@NgModule({
  declarations: [InstallationComponent],
  imports: [CommonModule, TuiNotificationModule],
  exports: [InstallationComponent],
})
export class InstallationModule {}
