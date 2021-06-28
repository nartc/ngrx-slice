import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { PeerDepsComponent } from './peer-deps.component';

@NgModule({
  declarations: [PeerDepsComponent],
  imports: [CommonModule, TuiAddonDocModule],
  exports: [PeerDepsComponent],
})
export class PeerDepsModule {}
