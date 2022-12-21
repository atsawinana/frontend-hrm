import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAttendanceComponent } from './timeAttendance.component';
import { TimeAttRoutes } from './timeAtt.routing';
import { RouterModule } from '@angular/router';
import { TimeAtthomeComponent } from './timeAtthome/timeAtthome.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TimeAttRoutes,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    TimeAttendanceComponent,
    TimeAtthomeComponent
  ]
})
export class TimeAttModule { }
