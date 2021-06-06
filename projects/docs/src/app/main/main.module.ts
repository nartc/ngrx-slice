import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { UiBlankLinkModule } from '../shared/ui-blank-link/ui-blank-link.module';
import { ActionTypeModule } from './action-type/action-type.module';
import { CounterEffectsModule } from './counter-effects/counter-effects.module';
import { CounterModule } from './counter/counter.module';
import { ExternalActionsModule } from './external-actions/external-actions.module';
import { InstallationModule } from './installation/installation.module';
import { MainComponent } from './main.component';
import { PeerDepsModule } from './peer-deps/peer-deps.module';
import {SpecialMentionsModule} from "./special-mentions/special-mentions.module";

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
    CounterEffectsModule,
    ActionTypeModule,
    ExternalActionsModule,
    SpecialMentionsModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
