import { Routes, RouterModule } from '@angular/router';
import { TimeattendanceHistoryAllComponent } from './timeattendance-history-all/timeattendance-history-all.component';
import { TimeattendanceHistoryComponent } from './timeattendance-history/timeattendance-history.component';
import { TimeattendanceListRequestComponent } from './timeattendance-list-request/timeattendance-list-request.component';
import { TimeattendanceRequestComponent } from './timeattendance-request/timeattendance-request.component';
import { TimeattendanceViewRequestComponent } from './timeattendance-view-request/timeattendance-view-request.component';
import { TimeAttendanceComponent } from './timeAttendance.component';
import { TimeAtthomeComponent } from './timeAtthome/timeAtthome.component';

const routes: Routes = [
    {
        path: '',
        component: TimeAttendanceComponent,
        children: [

            {
                path: 'time-request',
                component: TimeattendanceRequestComponent
            },
            {
                path: 'time-list-request',
                component: TimeattendanceListRequestComponent
            },
            {
                path: 'time-view-request/:id',
                component: TimeattendanceViewRequestComponent
            },
            {
                path: 'time-history',
                component: TimeattendanceHistoryComponent
            },
            {
                path: 'time-history-all',
                component: TimeattendanceHistoryAllComponent
            }
        ]
    },
    {
        path: 'home',
        component: TimeAtthomeComponent
    },
];

export const TimeAttRoutes = RouterModule.forChild(routes);
