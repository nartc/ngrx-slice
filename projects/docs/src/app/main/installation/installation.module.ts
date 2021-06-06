import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiAddonDocModule} from "@taiga-ui/addon-doc";
import {TuiNotificationModule} from "@taiga-ui/core";
import { InstallationComponent } from './installation.component';



@NgModule({
  declarations: [InstallationComponent],
  imports: [CommonModule, TuiNotificationModule, TuiAddonDocModule],
  exports: [InstallationComponent],
})
export class InstallationModule {}
