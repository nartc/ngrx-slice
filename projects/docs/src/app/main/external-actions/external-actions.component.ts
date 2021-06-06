// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./examples/slice.ts';
import { Component } from '@angular/core';

@Component({
  selector: 'docs-external-actions',
  template: `
    <tui-doc-example heading="External Actions" id="external-actions">
      <p>
        With
        <code>createSlice</code>
        API, internal reducers are used to generate
        <code>ActionCreators</code>
        , what about external actions that can change the
        <code>CounterState</code>
        ? We can utilize
        <code>extraReducers</code>
        for that
      </p>
      <tui-doc-code [code]="sliceTs"></tui-doc-code>
      <p>
        Because
        <code>triple</code>
        is an action that is external to this slice,
        <code>createSlice</code>
        will not generate an action for
        <code>triple</code>
        when it's used in
        <code>extraReducers</code>
        .
        <code>extraReducers</code>
        will be merged with
        <code>reducers</code>
        and return a complete reducer for
        <code>StoreModule.forFeature()</code>
      </p>
    </tui-doc-example>
  `,
})
export class ExternalActionsComponent {
  readonly sliceTs = sliceTs;
}
