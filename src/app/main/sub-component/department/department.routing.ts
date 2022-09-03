import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { ListDepartmentComponent } from './list-department/list-department.component';

const routes: Routes = [
  {
    path: '',
    component: ListDepartmentComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'add-department',
    component: AddDepartmentComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'edit-department',
    component: EditComponentComponent,
    canActivate: [AuthGuardGuard],
  },
];

export const DepartmentRoutes = RouterModule.forChild(routes);
