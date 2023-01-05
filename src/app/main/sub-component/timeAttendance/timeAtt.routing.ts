import { Routes, RouterModule } from '@angular/router';
import { TimeattendanceRequestComponent } from './timeattendance-request/timeattendance-request.component';
import { TimeAttendanceComponent } from './timeAttendance.component';
import { TimeAtthomeComponent } from './timeAtthome/timeAtthome.component';

const routes: Routes = [
  {
    path: '',
    component: TimeAttendanceComponent,
    children: [
      {
        path: '',
        component:TimeAtthomeComponent
      },
      {
        path: 'time-request',
        component: TimeattendanceRequestComponent
      }
    ]
  },
];

export const TimeAttRoutes = RouterModule.forChild(routes);
