import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
