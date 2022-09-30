import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'resetpass', component: ResetPasswordComponent },
];

export const ProfileRoutes = RouterModule.forChild(routes);
