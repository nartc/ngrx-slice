import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { TuiLinkModule } from '@taiga-ui/core';
import { UiBlankLinkModule } from '../shared/ui-blank-link/ui-blank-link.module';
import { ActionTypeModule } from './action-type/action-type.module';
import { CounterEffectsModule } from './counter-effects/counter-effects.module';
import { CounterModule } from './counter/counter.module';
import { EntityModule } from './entity/entity.module';
import { ExternalActionsModule } from './external-actions/external-actions.module';
import { InstallationModule } from './installation/installation.module';
import { MainComponent } from './main.component';
import { NamespacedSliceModule } from './namespaced-slice/namespaced-slice.module';
import { PeerDepsModule } from './peer-deps/peer-deps.module';
import { SpecialMentionsModule } from './special-mentions/special-mentions.module';

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
    TuiLinkModule,
    NamespacedSliceModule,
    EntityModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
