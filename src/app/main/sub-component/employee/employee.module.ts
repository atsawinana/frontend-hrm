import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RouterModule } from '@angular/router';
import { DataPersonComponent } from './data-person/data-person.component';
import { EmployeeRoutes } from './employee.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutes
  ],
  declarations: [
    ListEmployeeComponent,
    AddEmployeeComponent,
    DataPersonComponent
  ]
})
export class EmployeeModule { }
