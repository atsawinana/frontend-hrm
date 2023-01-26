import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeAttendanceComponent } from './timeAttendance.component';
import { TimeAttRoutes } from './timeAtt.routing';
import { RouterModule } from '@angular/router';
import { TimeAtthomeComponent } from './timeAtthome/timeAtthome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimeattendanceRequestComponent } from './timeattendance-request/timeattendance-request.component';
import { TimeattendanceViewRequestComponent } from './timeattendance-view-request/timeattendance-view-request.component';
import { TimeattendanceListRequestComponent } from './timeattendance-list-request/timeattendance-list-request.component';
import { TimeattendanceHistoryAllComponent } from './timeattendance-history-all/timeattendance-history-all.component';
import { TimeattendanceHistoryComponent } from './timeattendance-history/timeattendance-history.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TimeAttRoutes,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    DatePipe,
  ],
  declarations: [
    TimeAttendanceComponent,
    TimeAtthomeComponent,
    TimeattendanceRequestComponent,
    TimeattendanceViewRequestComponent,
    TimeattendanceListRequestComponent,
    TimeattendanceHistoryAllComponent,
    TimeattendanceHistoryComponent
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: "TH-th" }
  ],
})
export class TimeAttModule { }
