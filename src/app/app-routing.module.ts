import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './main/sub-component/leave/leave.component';
import { MainComponent } from './main/main-component/main.component';
import { OtComponent } from './main/sub-component/ot/ot.component';
import { ProfileComponent } from './main/sub-component/profile/profile.component';
import { TimeAttendanceComponent } from './main/sub-component/timeAttendance/timeAttendance.component';
import { EmployeeComponent } from './main/sub-component/employee/employee.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { TravelExpensesComponent } from './main/sub-component/travelExpenses/travelExpenses.component';
import { ActivityComponent } from './main/sub-component/activity/activity.component';
import { RoleGuard } from './auth/role.guard';

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
      { path: '', component: ProfileComponent },
      { path: 'leave', component: LeaveComponent},
      {
        path: 'department',
        loadChildren: () =>
          import('./main/sub-component/department/department.module').then(
            (m) => m.DepartmentModule
          ),canActivate: [RoleGuard]
      },
      { path: 'ot', component: OtComponent  },
      { path: 'profile', component: ProfileComponent },
      { path: 'timeattendance', component: TimeAttendanceComponent },
      { path: 'employee', component: EmployeeComponent ,canActivate: [RoleGuard] },
      { path: 'car', component: TravelExpensesComponent },
      { path: 'activity',component: ActivityComponent},
    ],
    canActivate: [AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard,RoleGuard]
})
export class AppRoutingModule {}
