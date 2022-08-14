import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './sub-component/leave/leave.component';
import { MainComponent } from './main-component/main.component';
import { OtComponent } from './sub-component/ot/ot.component';
import { ProfileComponent } from './sub-component/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'leave',
    component: LeaveComponent,
  },
  {
    path: 'department',
    loadChildren: () => import('./sub-component/department/department.module').then((m) => m.DepartmentModule),
  },
  {
    path: 'ot',
    component: OtComponent,
  },
  {
    path: 'home-main',
    component: MainComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

export const MainRoutes = RouterModule.forChild(routes);
