import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/auth-guard.guard';
import { RoleGuard } from 'src/app/auth/role.guard';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DepartmentMainComponent } from './department-main/department-main.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { EmpDepartmentComponent } from './emp-department/emp-department.component';
import { EmpEndDepartmentComponent } from './emp-end-department/emp-end-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentMainComponent,
    canActivate: [AuthGuardGuard, RoleGuard],
    children: [
      {
        path: '',
        component: ListDepartmentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
      {
        path: 'list',
        component: ListDepartmentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
      {
        path: 'add-department',
        component: AddDepartmentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
      {
        path: 'edit-department/:dept_id',
        component: EditComponentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
      {
        path: 'emp-department/:dept_id',
        component: EmpDepartmentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
      {
        path: 'emp-end-department/:dept_id',
        component: EmpEndDepartmentComponent,
        canActivate: [AuthGuardGuard, RoleGuard],
      },
    ],
  },
];

export const DepartmentRoutes = RouterModule.forChild(routes);
