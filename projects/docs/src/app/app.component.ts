import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <tui-doc-main>
      <ng-container ngProjectAs="tuiDocHeader">
        <a tuiLink class="link" href="https://github.com/nartc/ngrx-slice"> GitHub </a>
      </ng-container>
    </tui-doc-main>
  `,
  styles: [
    `
      :host ::ng-deep tui-doc-navigation.tui-doc-navigation {
        display: none;
      }

      :host ::ng-deep .tui-doc-content {
        margin-left: 0;
      }

      .link {
        margin-left: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'docs';
}
