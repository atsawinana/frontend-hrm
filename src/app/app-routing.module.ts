import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main-component/main.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { RoleGuard } from './auth/role.guard';
import { NgModule } from '@angular/core';

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
      { path: '', loadChildren: () => import('./main/main.module').then((m) => m.MainModule), canActivate: [AuthGuardGuard] },
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
