import { Component } from '@angular/core';

@Component({
  selector: 'docs-main',
  template: `
    <tui-doc-page header="NgRX Slice">
      <p>
        <code>ngrx-slice</code>
        is a plugin that intends to provide the same functionalities that
        <a href="https://redux-toolkit.js.org/api/createSlice">
          Redux Toolkit createSlice
        </a>
        provides. It is meant to be
        <strong>opinionated</strong>
        .
      </p>

      <p>
        <code>ngrx-slice</code>
        also assumes the consumers to be familiar with the concepts of
        <strong>NgRX</strong>
        . If not, please visit
        <a href="https://ngrx.io/guide/store">NgRX Official Documentations</a>
        before continue on.
      </p>

      <ul class="tui-list">
        <li class="tui-list__item">
          Express a slice of the global state in a single central place
        </li>
        <li class="tui-list__item">
          Generate
          <code>ActionCreators</code>
          from reducers' cases
        </li>
        <li class="tui-list__item">
          Generate
          <strong>Async</strong>
          <code>ActionCreators</code>
          from reducers' cases
        </li>
        <li class="tui-list__item">
          Generate
          <code>MemoizedSelectors</code>
          from
          <code>initialState</code>
        </li>
        <li class="tui-list__item">
          Utilize
          <code>immer</code>
          and
          <code>ngrx-immer</code>
          under the hood for State updates
        </li>
        <li class="tui-list__item">Customizable (partial) Actions' types</li>
      </ul>

      <docs-peer-deps></docs-peer-deps>
      <docs-installation></docs-installation>
      <docs-counter></docs-counter>
      <docs-counter-effects></docs-counter-effects>
      <docs-action-type></docs-action-type>
      <docs-external-actions></docs-external-actions>
      <docs-special-mentions></docs-special-mentions>
    </tui-doc-page>
  `,
})
export class MainComponent {}
