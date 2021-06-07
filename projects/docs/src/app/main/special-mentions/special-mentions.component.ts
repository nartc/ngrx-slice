import { Component } from '@angular/core';

@Component({
  selector: 'docs-special-mentions',
  template: `
    <tui-doc-example heading="Special Mentions" id="special-mentions">
      <ul class="tui-list">
        <li class="tui-list__item">
          Marko Stanimirović (
          <a tuiLink href="https://twitter.com/MarkoStDev">@MarkoStDev</a>
          ) for
          <code>ngrx-child-selectors</code>
          and his
          <code>createFeature</code>
          PR
        </li>
        <li class="tui-list__item">
          Tim Deschryver (
          <a tuiLink href="https://twitter.com/tim_deschryver">
            @tim_deschryver
          </a>
          ) for
          <code>ngrx-immer</code>
        </li>
        <li class="tui-list__item">
          Mark Erikson (
          <a tuiLink href="https://twitter.com/acemarke">@acemarke</a>
          ) for Redux Toolkit
        </li>
      </ul>
    </tui-doc-example>
  `,
})
export class SpecialMentionsComponent {}
