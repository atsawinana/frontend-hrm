import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/auth/role.guard';
import { DetailComponent } from './leave-history/detail/detail.component';
import { EditDetailComponent } from './leave-history/detail/edit-detail/edit-detail.component';
import { HistoryComponent } from './leave-history/history/history.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { DetailViewRequestComponent } from './leave-view-request/detail-view-request/detail-view-request.component';
import { LeaveViewRequestComponent } from './leave-view-request/leave-view-request.component';
import { LeaveComponent } from './leave.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveComponent,
        children: [
            {
                path: '',
                component: LeaveInfoComponent,
            },
            {
                path: 'info',
                component: LeaveInfoComponent,
            },
            {
                path: 'all-history',
                component: HistoryComponent,
            },
            {
                path: 'history',
                component: LeaveHistoryComponent,
                children: [
                    {
                        path: '',
                        component: HistoryComponent
                    },
                    {
                        path: 'detail/:id',
                        component: DetailComponent
                    },
                    {
                        path: 'edit-detail/:id',
                        component: EditDetailComponent
                    }
                ]
            },
            {
                path: 'request',
                component: LeaveRequestComponent,
            },
            {
                path: 'view-request',
                component: LeaveViewRequestComponent,
            },
            {
                path: 'request',
                component: LeaveRequestComponent,
            },
            {
                path: 'view-request',
                component: LeaveViewRequestComponent,
            },
            {
                path: 'view-request-detail/:id',
                component: DetailViewRequestComponent,
            }
        ]
    },

];

export const LeaveRoutes = RouterModule.forChild(routes);
