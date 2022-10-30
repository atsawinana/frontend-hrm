import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileRoutes } from './profile.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, ResetPasswordComponent],
})
export class ProfileModule { }
