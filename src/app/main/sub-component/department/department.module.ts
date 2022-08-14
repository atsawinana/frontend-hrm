import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutes
  ],
  declarations: [
    AddDepartmentComponent,
    ListDepartmentComponent
  ]
})
export class DepartmentModule { }
