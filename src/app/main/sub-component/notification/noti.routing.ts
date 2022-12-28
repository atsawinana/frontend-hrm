import { Routes, RouterModule } from '@angular/router';
import { AllNotiComponent } from './noti-list/all-noti/all-noti.component';
import { LeaveNotiComponent } from './noti-list/leave-noti/leave-noti.component';
import { NotiListComponent } from './noti-list/noti-list.component';
import { OtNotiComponent } from './noti-list/ot-noti/ot-noti.component';
import { WorkNotiComponent } from './noti-list/work-noti/work-noti.component';

const routes: Routes = [
  {
    path: '',
    component: NotiListComponent,
    children: [
      { path: 'all-notification', component: AllNotiComponent },
      { path: 'work-notification', component: WorkNotiComponent },
      { path: 'leave-notification', component: LeaveNotiComponent },
      { path: 'ot-notification', component: OtNotiComponent },
    ],
  },
];

export const NotiRoutes = RouterModule.forChild(routes);
