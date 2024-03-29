import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RouterModule } from '@angular/router';
import { DataPersonComponent } from './data-person/data-person.component';
import { EmployeeRoutes } from './employee.routing';
import { DetailDataPersonComponent } from './data-person/person-employee/detail-data-person/detail-data-person.component';
import { LeaveHistoryPersonComponent } from './data-person/person-employee/leave-history-person/leave-history-person.component';
import { OtHistoryPersonComponent } from './data-person/person-employee/ot-history-person/ot-history-person.component';
import { WorkHistoryPersonComponent } from './data-person/person-employee/work-history-person/work-history-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeOverbuttonComponent } from './employee-overbutton/employee-overbutton.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingEmployeeComponent } from './loading-employee/loading-employee.component';
import { EndContractComponent } from './end-contract/end-contract.component';
import { LoadingEmpComponent } from './loading-emp/loading-emp.component';
import { DatePipe } from '@angular/common';
import { EditDetailPersonComponent } from './data-person/person-employee/edit-detail-person/edit-detail-person.component';
import { DataPersonBtnComponent } from './data-person/data-person-btn/data-person-btn.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { EmployeeMainComponent } from './employee-main/employee-main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutes,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatePipe,
    ClipboardModule,
  ],
  declarations: [
    ListEmployeeComponent,
    AddEmployeeComponent,
    DataPersonComponent,
    DetailDataPersonComponent,
    LeaveHistoryPersonComponent,
    OtHistoryPersonComponent,
    WorkHistoryPersonComponent,
    EmployeeOverbuttonComponent,
    LoadingEmployeeComponent,
    EndContractComponent,
    LoadingEmpComponent,
    EditDetailPersonComponent,
    DataPersonBtnComponent,
    EmployeeMainComponent

  ],
  providers: [DatePipe],
    
})
export class EmployeeModule {}
