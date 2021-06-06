import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TuiDocExampleModule} from "@taiga-ui/addon-doc";
import { SpecialMentionsComponent } from './special-mentions.component';

@NgModule({
  declarations: [SpecialMentionsComponent],
  imports: [CommonModule, TuiDocExampleModule],
  exports: [SpecialMentionsComponent],
})
export class SpecialMentionsModule {}
