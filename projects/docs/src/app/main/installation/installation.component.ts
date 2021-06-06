import { Component } from '@angular/core';

@Component({
  selector: 'docs-installation',
  template: `
    <pre>
      <code>npm install ngrx-slice</code>
      <code>yarn add ngrx-slice</code>
    </pre>
    <tui-notification>
      <code>ngrx-slice</code> depends on <code>ngrx-immer</code> and
      <code>immer</code> so these two dependencies will be installed alongside
      with <code>ngrx-slice</code>
    </tui-notification>
  `,
  styles: [
    `
      pre {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `,
  ],
})
export class InstallationComponent {}
