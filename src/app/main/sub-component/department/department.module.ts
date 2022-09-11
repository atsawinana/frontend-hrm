import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponentComponent } from './edit-component/edit-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutes
  ],
  declarations: [
    AddDepartmentComponent,
    ListDepartmentComponent,
    EditComponentComponent
  ]
})
export class DepartmentModule { }
