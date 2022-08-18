import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutes,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    AddDepartmentComponent,
    ListDepartmentComponent
  ]
})
export class DepartmentModule { }
