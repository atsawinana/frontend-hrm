import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileRoutes } from './profile.routing';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes,
    NgChartsModule
  ],
  declarations: [ProfileComponent,ResetPasswordComponent]
})
export class ProfileModule { }
