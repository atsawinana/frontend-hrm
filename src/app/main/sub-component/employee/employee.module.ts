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
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutes,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    ListEmployeeComponent,
    AddEmployeeComponent,
    DataPersonComponent,
    DetailDataPersonComponent,
    LeaveHistoryPersonComponent,
    OtHistoryPersonComponent,
    WorkHistoryPersonComponent
  ]
})
export class EmployeeModule { }
