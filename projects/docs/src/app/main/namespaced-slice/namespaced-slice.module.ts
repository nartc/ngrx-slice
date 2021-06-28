import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TuiAddonDocModule} from "@taiga-ui/addon-doc";
import { NamespacedSliceComponent } from './namespaced-slice.component';

@NgModule({
  imports: [CommonModule, TuiAddonDocModule],
  declarations: [NamespacedSliceComponent],
  exports: [NamespacedSliceComponent],
})
export class NamespacedSliceModule {}
