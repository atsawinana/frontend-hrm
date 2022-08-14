import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './main/sub-component/leave/leave.component';
import { MainComponent } from './main/main-component/main.component';
import { OtComponent } from './main/sub-component/ot/ot.component';
import { ProfileComponent } from './main/sub-component/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'leave', component: LeaveComponent },
      {
        path: 'department',
        loadChildren: () => import('./main/sub-component/department/department.module').then((m) => m.DepartmentModule),
      },
      { path: 'ot', component: OtComponent },
      { path: 'home-main', component: MainComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
