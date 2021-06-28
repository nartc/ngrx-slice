// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./examples/slice.ts';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-namespaced-slice',
  template: `
    <tui-doc-example heading="Namespaced Slice" id="namespaced-slice">
      <p>
        <code>ngrx-slice</code>
        exposes a more opinionated
        <code>createSlice</code>
        which is
        <code>createNamespacedSlice</code>
      </p>
      <p>
        <code>createNamespacedSlice</code>
        utilizes the
        <code>name</code>
        of the slice to return a more-opinionated object, aka "namespaced". For
        example:
      </p>

      <tui-doc-code [code]="sliceTs"></tui-doc-code>
    </tui-doc-example>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespacedSliceComponent {
  readonly sliceTs = sliceTs;
}
