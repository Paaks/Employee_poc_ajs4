import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeeFormComponent } from "./employee-form/employee-form.component";

const employeesRoutes: Routes = [
  { path: 'employees', component: EmployeesComponent, pathMatch: 'full' },
  { path: 'employees/new', component: EmployeeFormComponent},
  { path: 'employees/:id', component: EmployeeFormComponent}
];

export const EmployeesRouting = RouterModule.forChild(employeesRoutes);
