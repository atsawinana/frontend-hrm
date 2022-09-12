import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { Router} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutes,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    AddDepartmentComponent,
    ListDepartmentComponent,
    EditComponentComponent
  ]
})
export class DepartmentModule { }
