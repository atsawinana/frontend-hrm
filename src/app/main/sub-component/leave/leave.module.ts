import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRoutes } from './leave.routing';
import { LeaveComponent } from './leave.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { HistoryComponent } from './leave-history/history/history.component';
import { DetailComponent } from './leave-history/detail/detail.component';
import { EditDetailComponent } from './leave-history/detail/edit-detail/edit-detail.component';
import { OverbuttonComponent } from './overbutton/overbutton.component';
import { LoadingLeaveInfoComponent } from './loading-leave-info/loading-leave-info.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeaveViewRequestComponent } from './leave-view-request/leave-view-request.component';
import { DetailViewRequestComponent } from './leave-view-request/detail-view-request/detail-view-request.component';
import { DatePipe } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        LeaveRoutes,    
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DatePipe,
    ],
    declarations: [
        LeaveComponent,
        LeaveHistoryComponent,
        LeaveRequestComponent,
        LeaveInfoComponent,
        HistoryComponent,
        DetailComponent,
        EditDetailComponent,
        OverbuttonComponent,
        LoadingLeaveInfoComponent,
        LeaveViewRequestComponent,
        DetailViewRequestComponent,
    ],
    providers: [DatePipe],
})
export class LeaveModule { }
