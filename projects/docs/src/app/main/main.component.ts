import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-main',
  template: `
    <tui-doc-page header="NgRX Slice">
      <p>
        <code>ngrx-slice</code> is a plugin that intends to provide the same
        functionalities that
        <a href="https://redux-toolkit.js.org/api/createSlice"
          >Redux Toolkit createSlice</a
        >
        provides. It is meant to be <strong>opinionated</strong>.
      </p>

      <ul class="tui-list">
        <li class="tui-list__item">
          Express a slice of the global state in a single central place
        </li>
        <li class="tui-list__item">
          Generate <code>ActionCreators</code> from reducers' cases
        </li>
        <li class="tui-list__item">
          Generate <strong>Async</strong> <code>ActionCreators</code> from
          reducers' cases
        </li>
        <li class="tui-list__item">
          Generate <code>MemoizedSelectors</code> from <code>initialState</code>
        </li>
        <li class="tui-list__item">
          Utilize <code>immer</code> and <code>ngrx-immer</code> under the hood
          for State updates
        </li>
        <li class="tui-list__item">Customizable (partial) Actions' types</li>
      </ul>

      <tui-doc-example heading="Peer Dependencies" id="peer-dependencies">
        <docs-peer-deps></docs-peer-deps>
      </tui-doc-example>

      <tui-doc-example heading="Installation" id="installation">
        <docs-installation></docs-installation>
      </tui-doc-example>

        <docs-counter></docs-counter>

    </tui-doc-page>
  `,
  styles: [],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
