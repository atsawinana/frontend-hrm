import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotiRoutes } from './noti.routing';
import { NotiListComponent } from './noti-list/noti-list.component';
import { AllNotiComponent } from './noti-list/all-noti/all-noti.component';
import { LeaveNotiComponent } from './noti-list/leave-noti/leave-noti.component';
import { NotificationLoadingComponent } from './noti-list/notification-loading/notification-loading.component';
import { WorkNotiComponent } from './noti-list/work-noti/work-noti.component';
import { OtNotiComponent } from './noti-list/ot-noti/ot-noti.component';

@NgModule({
  imports: [
    CommonModule,
    NotiRoutes
  ],
  declarations: [
    NotiListComponent,
    AllNotiComponent,
    LeaveNotiComponent,
    NotificationLoadingComponent,
    WorkNotiComponent,
    OtNotiComponent
  ]
})
export class NotiModule { }
