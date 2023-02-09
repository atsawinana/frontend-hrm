import { Routes, RouterModule } from '@angular/router';
import { OtHistoryAllComponent } from './ot-history-all/ot-history-all.component';
import { OtHistoryComponent } from './ot-history/ot-history.component';
import { OtHomeComponent } from './ot-home/ot-home.component';
import { OtListRequestComponent } from './ot-list-request/ot-list-request.component';
import { OtRequestComponent } from './ot-request/ot-request.component';
import { OtViewRequestComponent } from './ot-view-request/ot-view-request.component';
import { OtComponent } from './ot.component';

const routes: Routes = [
    {
        path: "",
        component: OtComponent,
        children: [
            {
                path: "",
                component: OtHomeComponent
            },
            {
                path: "request",
                component: OtRequestComponent
            },
            {
                path: "history",
                component: OtHistoryComponent
            },
            {
                path: "list-request",
                component: OtListRequestComponent
            },
            {
                path: "view-request/:id",
                component: OtViewRequestComponent
            },
            {
                path: "all-history",
                component: OtHistoryAllComponent
            },
        ]
    },
];

export const OtRoutes = RouterModule.forChild(routes);
