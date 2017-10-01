import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { EmployeesComponent } from './employees.component';
import { EmployeesService } from './shared/employees.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent
  ],
  exports: [
    EmployeesComponent
  ],
  providers: [
    EmployeesService
  ]
})
export class EmployeesModule { }
