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
import { UnapprovedComponent } from './leave-info/unapproved/unapproved.component';

@NgModule({
    imports: [
        CommonModule,
        LeaveRoutes
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
        UnapprovedComponent
    ]
})
export class LeaveModule { }