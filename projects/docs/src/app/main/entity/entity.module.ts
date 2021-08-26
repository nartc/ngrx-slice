import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TuiDocCodeModule, TuiDocExampleModule } from '@taiga-ui/addon-doc';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { TodoComponent } from './todo.component';
import { TodoFeature } from './todo.slice';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(TodoFeature),
    TuiInputModule,
    FormsModule,
    TuiButtonModule,
    TuiDocExampleModule,
    TuiDocCodeModule,
  ],
  exports: [TodoComponent],
})
export class EntityModule {}
