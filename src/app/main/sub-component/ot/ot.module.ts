import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtComponent } from './ot.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OtHomeComponent } from './ot-home/ot-home.component';
import { OtRoutes } from './ot.routing';
import { OtRequestComponent } from './ot-request/ot-request.component';
import { OtViewRequestComponent } from './ot-view-request/ot-view-request.component';
import { OtListRequestComponent } from './ot-list-request/ot-list-request.component';
import { OtHistoryComponent } from './ot-history/ot-history.component';
import { OtBtnOverComponent } from './ot-btn-over/ot-btn-over.component';
import { OtHistoryAllComponent } from './ot-history-all/ot-history-all.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OtRoutes
    ],
    declarations: [
        OtComponent,
        OtHomeComponent,
        OtRequestComponent,
        OtViewRequestComponent,
        OtListRequestComponent,
        OtHistoryComponent,
        OtBtnOverComponent,
        OtHistoryAllComponent
    ]
})
export class OtModule { }
