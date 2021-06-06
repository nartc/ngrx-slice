import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <tui-doc-main></tui-doc-main>
  `,
  styles: [
    `
      :host ::ng-deep tui-doc-navigation.tui-doc-navigation {
        display: none;
      }

      :host ::ng-deep .tui-doc-content {
        margin-left: 0;
      }
    `,
  ],
})
export class AppComponent {
  title = 'docs';
}
