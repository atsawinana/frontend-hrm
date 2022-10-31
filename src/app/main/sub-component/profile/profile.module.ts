import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileRoutes } from './profile.routing';
import { NgChartsModule } from 'ng2-charts';
import { ChartOtComponent } from './chart-ot/chart-ot.component';
import { ChartLeaveComponent } from './chart-leave/chart-leave.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ProfileRoutes, NgChartsModule, ReactiveFormsModule],
  declarations: [
    ProfileComponent,
    ResetPasswordComponent,
    ChartOtComponent,
    ChartLeaveComponent,
  ],
})
export class ProfileModule {}
