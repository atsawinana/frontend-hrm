import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtunOverPageComponent } from './buttun-over-page/buttun-over-page.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingOverscreenComponent } from './loading-overscreen/loading-overscreen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtunOverPageComponent,
    LoadingComponent,
    LoadingOverscreenComponent
  ],
  exports:[
    ButtunOverPageComponent,
    LoadingComponent,
    LoadingOverscreenComponent
  ]
})
export class SharedComponentModule { }
