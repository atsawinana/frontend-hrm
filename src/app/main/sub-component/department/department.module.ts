import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { BtnDepartmentComponent } from './btn-department/btn-department.component';
import { EmpDepartmentComponent } from './emp-department/emp-department.component';
import { EmpEndDepartmentComponent } from './emp-end-department/emp-end-department.component';
import { DepartmentMainComponent } from './department-main.component';
import { SharedComponentModule } from '../../shared-component/shared-component.module';


@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutes,
        FormsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        NgxPaginationModule,
        SharedComponentModule
    ],
    declarations: [
        AddDepartmentComponent,
        ListDepartmentComponent,
        EditComponentComponent,
        BtnDepartmentComponent,
        EmpDepartmentComponent,
        EmpEndDepartmentComponent,
        DepartmentMainComponent
    ],
})
export class DepartmentModule { }
