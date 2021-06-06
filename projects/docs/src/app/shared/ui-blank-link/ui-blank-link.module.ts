import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiBlankLinkDirective } from './ui-blank-link.directive';

@NgModule({
  declarations: [UiBlankLinkDirective],
  imports: [CommonModule],
  exports: [UiBlankLinkDirective],
})
export class UiBlankLinkModule {}
