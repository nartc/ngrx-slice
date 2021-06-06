import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { UiBlankLinkModule } from '../shared/ui-blank-link/ui-blank-link.module';
import {CounterModule} from "./counter/counter.module";
import { InstallationModule } from './installation/installation.module';
import { MainComponent } from './main.component';
import { PeerDepsModule } from './peer-deps/peer-deps.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(MainComponent)),
    UiBlankLinkModule,
    PeerDepsModule,
    InstallationModule,
    CounterModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
