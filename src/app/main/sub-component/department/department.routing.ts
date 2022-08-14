import { Routes, RouterModule } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { ListDepartmentComponent } from './list-department/list-department.component';

const routes: Routes = [
  { 
    path: '',
    component: ListDepartmentComponent
   },
   {
    path: 'add-department',
    component: AddDepartmentComponent,
   },
   {
    path: 'edit-department',
    component: EditComponentComponent,
   }
];

export const DepartmentRoutes = RouterModule.forChild(routes);
