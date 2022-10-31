import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './main/sub-component/leave/leave.component';
import { MainComponent } from './main/main-component/main.component';
import { OtComponent } from './main/sub-component/ot/ot.component';
import { ProfileComponent } from './main/sub-component/profile/profile.component';
import { TimeAttendanceComponent } from './main/sub-component/timeAttendance/timeAttendance.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { TravelExpensesComponent } from './main/sub-component/travelExpenses/travelExpenses.component';
import { ActivityComponent } from './main/sub-component/activity/activity.component';
import { RoleGuard } from './auth/role.guard';
import { ListEmployeeComponent } from './main/sub-component/employee/list-employee/list-employee.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', loadChildren: () => import('./main/sub-component/profile/profile.module').then((m) => m.ProfileModule), canActivate: [AuthGuardGuard] },
      { path: 'leave', loadChildren: () => import('./main/sub-component/leave/leave.module').then((m)=> m.LeaveModule), canActivate: [AuthGuardGuard] },
      {
        path: 'department', loadChildren: () => import('./main/sub-component/department/department.module').then((m) => m.DepartmentModule), canActivate: [RoleGuard, AuthGuardGuard]
      },
      { path: 'ot', component: OtComponent, canActivate: [AuthGuardGuard] },
      { path: 'profile', loadChildren: () => import('./main/sub-component/profile/profile.module').then((m) => m.ProfileModule), canActivate: [AuthGuardGuard] },
      { path: 'timeattendance', component: TimeAttendanceComponent, canActivate: [AuthGuardGuard] },
      { path: 'employee', loadChildren: () => import('./main/sub-component/employee/employee.module').then((m) => m.EmployeeModule), canActivate: [RoleGuard, AuthGuardGuard] },
      { path: 'car', component: TravelExpensesComponent, canActivate: [AuthGuardGuard] },
      { path: 'activity', component: ActivityComponent, canActivate: [AuthGuardGuard] },
      { path: 'notification', loadChildren: () => import('./main/sub-component/notification/noti.module').then((m)=> m.NotiModule) },
    ],
    canActivate: [AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard, RoleGuard]
})
export class AppRoutingModule { }
