import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotiRoutes } from './noti.routing';
import { NotiListComponent } from './noti-list/noti-list.component';

@NgModule({
  imports: [
    CommonModule,
    NotiRoutes
  ],
  declarations: [
    NotiListComponent
  ]
})
export class NotiModule { }
