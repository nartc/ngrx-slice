import { Component } from '@angular/core';

@Component({
  selector: 'docs-peer-deps',
  template: `
    <tui-doc-example heading="Peer Dependencies" id="peer-dependencies">
      <table class="tui-table">
        <thead>
          <tr class="tui-table__tr">
            <th class="tui-table__th">NgRx Slice</th>
            <th class="tui-table__th">Angular</th>
            <th class="tui-table__th">NgRX</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tui-table__tr">
            <td class="tui-table__td">v6</td>
            <td class="tui-table__td">v13</td>
            <td class="tui-table__td">v13</td>
          </tr>
          <tr class="tui-table__tr">
            <td class="tui-table__td">v5</td>
            <td class="tui-table__td">v11, v12</td>
            <td class="tui-table__td">v11, v12</td>
          </tr>
          <tr class="tui-table__tr">
            <td class="tui-table__td" colspan="2">
              No support for
              <strong>Angular</strong>
              <11 because of
              <strong>TypeScript</strong>
              version
            </td>
          </tr>
        </tbody>
      </table>
    </tui-doc-example>
  `,
})
export class PeerDepsComponent {}
