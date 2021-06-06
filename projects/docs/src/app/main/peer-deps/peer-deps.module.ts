import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeerDepsComponent } from './peer-deps.component';

@NgModule({
  declarations: [PeerDepsComponent],
  imports: [CommonModule],
  exports: [PeerDepsComponent],
})
export class PeerDepsModule {}
