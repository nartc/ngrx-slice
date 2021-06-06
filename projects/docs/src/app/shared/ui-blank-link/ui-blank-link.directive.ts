import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'a:not([target="_blank"])',
})
export class UiBlankLinkDirective {
  @HostBinding('target') target = '_blank';
}
