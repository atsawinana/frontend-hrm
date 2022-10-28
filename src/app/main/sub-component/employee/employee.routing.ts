import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/auth-guard.guard';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DataPersonComponent } from './data-person/data-person.component';
import { DetailDataPersonComponent } from './data-person/person-employee/detail-data-person/detail-data-person.component';
import { EditDetailPersonComponent } from './data-person/person-employee/edit-detail-person/edit-detail-person.component';
import { LeaveHistoryPersonComponent } from './data-person/person-employee/leave-history-person/leave-history-person.component';
import { OtHistoryPersonComponent } from './data-person/person-employee/ot-history-person/ot-history-person.component';
import { WorkHistoryPersonComponent } from './data-person/person-employee/work-history-person/work-history-person.component';
import { EndContractComponent } from './end-contract/end-contract.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

const routes: Routes = [
  { path: '', component: ListEmployeeComponent, canActivate: [AuthGuardGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuardGuard] },
  { path: 'list-employee', component: ListEmployeeComponent, canActivate: [AuthGuardGuard] },
  { path: 'end-contract-employee', component: EndContractComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'data-person',
    component: DataPersonComponent,
    children: [
      {
        path: '',
        component: DetailDataPersonComponent, canActivate: [AuthGuardGuard]
      },
      {
        path: 'detail',
        component: DetailDataPersonComponent, canActivate: [AuthGuardGuard]
      },
      {
        path: 'leave-history',
        component: LeaveHistoryPersonComponent, canActivate: [AuthGuardGuard]
      },
      {
        path: 'ot-history',
        component: OtHistoryPersonComponent, canActivate: [AuthGuardGuard]
      },
      {
        path: 'work-history',
        component: WorkHistoryPersonComponent, canActivate: [AuthGuardGuard]
      },
      {
        path: 'edit-detail',
        component: EditDetailPersonComponent, canActivate: [AuthGuardGuard]
      },
    ],
    canActivate: [AuthGuardGuard]
  },
];

export const EmployeeRoutes = RouterModule.forChild(routes);
