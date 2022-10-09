import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutes } from './department.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingDepartmentComponent } from './loading-department/loading-department.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchFilterPipe } from './list-department/search-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutes,
        FormsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        NgxPaginationModule
    ],
    declarations: [
        AddDepartmentComponent,
        ListDepartmentComponent,
        EditComponentComponent,
        LoadingDepartmentComponent,
        SearchFilterPipe
    ],
})
export class DepartmentModule { }
