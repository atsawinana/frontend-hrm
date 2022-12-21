import { Routes, RouterModule } from '@angular/router';
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
      }
    ]
  },
];

export const TimeAttRoutes = RouterModule.forChild(routes);
