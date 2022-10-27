import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/auth/role.guard';
import { DetailComponent } from './leave-history/detail/detail.component';
import { EditDetailComponent } from './leave-history/detail/edit-detail/edit-detail.component';
import { HistoryComponent } from './leave-history/history/history.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { UnapprovedComponent } from './leave-info/unapproved/unapproved.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveInfoComponent,
    },
    {
        path: 'info',
        component: LeaveInfoComponent,
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
        path: 'unapproved',
        component: UnapprovedComponent,
    }
];

export const LeaveRoutes = RouterModule.forChild(routes);