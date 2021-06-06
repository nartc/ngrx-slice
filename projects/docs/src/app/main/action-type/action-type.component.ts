// @ts-ignore
import { default as actionTypeTs } from '!!raw-loader!./examples/actions.ts';
import { Component } from '@angular/core';

@Component({
  selector: 'docs-action-type',
  template: `
    <tui-doc-example heading="Action Type" id="action-type">
      <p>
        By default, all generated actions will have the following type:
        <code>[featureName_in_capitalize]: actionName</code>
        and all generated async actions will have the same type with
        <code>success</code>
        ,
        <code>failure</code>
        , and
        <code>trigger</code>
        <em>suffixed</em>
        to respective actions. For example:
      </p>

      <tui-doc-code [code]="actionTypeTs"></tui-doc-code>

      <p>
        This behavior is customizable with
        <code>sliceActionNameGetter</code>
        that
        <code>createSlice</code>
        accepts.
        <code>sliceActionNameGetter</code>
        has the following signature:
        <code>(featureName: string, actionName: string) => string;</code>
      </p>
    </tui-doc-example>
  `,
})
export class ActionTypeComponent {
  readonly actionTypeTs = actionTypeTs;
}
