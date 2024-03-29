import { Routes, RouterModule } from '@angular/router';
import { OtComponent } from './sub-component/ot/ot.component';
import { TravelExpensesComponent } from './sub-component/travelExpenses/travelExpenses.component';
import { ActivityComponent } from './sub-component/activity/activity.component';
import { RoleGuard } from '../auth/role.guard';
import { AuthGuardGuard } from '../auth/auth-guard.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('./sub-component/profile/profile.module').then((m) => m.ProfileModule), canActivate: [AuthGuardGuard] },
    { path: 'leave', loadChildren: () => import('./sub-component/leave/leave.module').then((m) => m.LeaveModule), canActivate: [AuthGuardGuard] },
    {
        path: 'department', loadChildren: () => import('./sub-component/department/department.module').then((m) => m.DepartmentModule), canActivate: [RoleGuard, AuthGuardGuard]
    },
    // { path: 'ot', component: OtComponent, canActivate: [AuthGuardGuard] },
    { path: 'profile', loadChildren: () => import('./sub-component/profile/profile.module').then((m) => m.ProfileModule), canActivate: [AuthGuardGuard] },
    { path: 'timeattendance', loadChildren: () => import("./sub-component/timeAttendance/timeAtt.module").then((m) => m.TimeAttModule), canActivate: [AuthGuardGuard] },
    { path: 'employee', loadChildren: () => import('./sub-component/employee/employee.module').then((m) => m.EmployeeModule), canActivate: [RoleGuard, AuthGuardGuard] },
    // { path: 'car', component: TravelExpensesComponent, canActivate: [AuthGuardGuard] },
    // { path: 'activity', component: ActivityComponent, canActivate: [AuthGuardGuard] },
    { path: 'notification', loadChildren: () => import('./sub-component/notification/noti.module').then((m) => m.NotiModule) },

];

export const MainRoutes = RouterModule.forChild(routes);
