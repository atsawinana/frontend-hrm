import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRoutes } from './leave.routing';
import { LeaveComponent } from './leave.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { HistoryComponent } from './leave-history/history/history.component';
import { OverbuttonComponent } from './overbutton/overbutton.component';
import { LoadingLeaveInfoComponent } from './loading-leave-info/loading-leave-info.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeaveViewRequestComponent } from './leave-view-request/leave-view-request.component';
import { DetailViewRequestComponent } from './leave-view-request/detail-view-request/detail-view-request.component';
import { DatePipe } from '@angular/common';
import { LeaveEditRequestComponent } from './leave-edit-request/leave-edit-request.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeaveEditDateleaveComponent } from './leave-edit-dateleave/leave-edit-dateleave.component';
import { SharedComponentModule } from '../../shared-component/shared-component.module';


@NgModule({
    imports: [
        CommonModule,
        LeaveRoutes,    
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        DatePipe,
        SharedComponentModule
    ],
    declarations: [
        LeaveComponent,
        LeaveHistoryComponent,
        LeaveRequestComponent,
        LeaveInfoComponent,
        HistoryComponent,
        OverbuttonComponent,
        LoadingLeaveInfoComponent,
        LeaveViewRequestComponent,
        DetailViewRequestComponent,
        LeaveEditRequestComponent,
        LeaveEditDateleaveComponent
    ],
    providers: [DatePipe],
})
export class LeaveModule { }
