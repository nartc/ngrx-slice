import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiDocExampleModule } from '@taiga-ui/addon-doc';
import { TuiLinkModule } from '@taiga-ui/core';
import { SpecialMentionsComponent } from './special-mentions.component';

@NgModule({
  declarations: [SpecialMentionsComponent],
  imports: [CommonModule, TuiDocExampleModule, TuiLinkModule],
  exports: [SpecialMentionsComponent],
})
export class SpecialMentionsModule {}
