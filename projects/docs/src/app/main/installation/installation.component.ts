import { Component } from '@angular/core';

@Component({
  selector: 'docs-installation',
  template: `
    <tui-doc-example heading="Installation" id="installation">
      <pre>
      <code>npm install ngrx-slice</code>
      <code>yarn add ngrx-slice</code>
    </pre>

      <p>
        <code>ngrx-slice</code>
        has
        <code>ngrx-immer</code>
        and
        <code>immer</code>
        as its
        <code>peerDependencies</code>
        so go ahead and install those:
      </p>

      <pre>
        <code>npm install ngrx-immer immer</code>
        <code>yarn add ngrx-immer immer</code>
      </pre>

      <p>Here's one command for all three:</p>
      <pre>
        <code>npm install ngrx-slice ngrx-immer immer</code>
        <code>yarn add ngrx-slice ngrx-immer immer</code>
      </pre>
    </tui-doc-example>
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
