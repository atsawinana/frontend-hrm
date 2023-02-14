import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtunOverPageComponent } from './buttun-over-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtunOverPageComponent
  ],
  exports:[
    ButtunOverPageComponent
  ]
})
export class SharedComponentModule { }
