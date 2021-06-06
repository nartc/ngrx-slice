import { Component } from '@angular/core';

@Component({
  selector: 'docs-peer-deps',
  template: `
    <table class="tui-table">
      <thead>
        <tr class="tui-table__tr">
          <th class="tui-table__th">Angular</th>
          <th class="tui-table__th">NgRX</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tui-table__tr">
          <td class="tui-table__td">12+</td>
          <td class="tui-table__td">12+</td>
        </tr>
        <tr class="tui-table__tr">
          <td class="tui-table__td">11+</td>
          <td class="tui-table__td">11+</td>
        </tr>
        <tr class="tui-table__tr">
          <td class="tui-table__td" colspan="2">
            No support for <strong>Angular</strong> <11 because of
            <strong>TypeScript</strong> version
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class PeerDepsComponent {}
