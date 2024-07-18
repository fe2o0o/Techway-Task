import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  {path:"employee-form" , component:EmployeeFormComponent}
];
