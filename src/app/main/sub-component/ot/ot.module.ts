import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OtComponent } from './ot.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtHomeComponent } from './ot-home/ot-home.component';
import { OtRoutes } from './ot.routing';
import { OtRequestComponent } from './ot-request/ot-request.component';
import { OtViewRequestComponent } from './ot-view-request/ot-view-request.component';
import { OtListRequestComponent } from './ot-list-request/ot-list-request.component';
import { OtHistoryComponent } from './ot-history/ot-history.component';
import { OtBtnOverComponent } from './ot-btn-over/ot-btn-over.component';
import { OtHistoryAllComponent } from './ot-history-all/ot-history-all.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ButtunOverPageComponent } from '../../shared-component/buttun-over-page/buttun-over-page.component';
import { OtEditRequestComponent } from './ot-edit-request/ot-edit-request.component';
import { SharedComponentModule } from '../../shared-component/shared-component.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OtRoutes,
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        SharedComponentModule
    ],
    declarations: [
        OtComponent,
        OtHomeComponent,
        OtRequestComponent,
        OtViewRequestComponent,
        OtListRequestComponent,
        OtHistoryComponent,
        OtBtnOverComponent,
        OtHistoryAllComponent,
        OtEditRequestComponent
    ], 
    providers: [
        DatePipe,
    ],

})
export class OtModule { }
