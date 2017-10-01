import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee } from '../shared/employee';
import { EmployeesService } from '../shared/employees.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  employee: Employee = new Employee();

  title: string = 'New Employee';
  isCreate: boolean = true;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) {
   this.form = formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      emailId: ['', [
        Validators.required,
        BasicValidators.email
      ]],
      phone: ['',[
        Validators.required
      ]],
      empId: ['',[
        Validators.required
      ]],
      lastName : ['',[
        Validators.required
      ]],
      designation : ['',[
        Validators.required
      ]],
      dept : ['',[
        Validators.required
      ]]
    }); 
  }

  ngOnInit() {

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.title = 'Edit Employee';
        this.isCreate = false;

        this.employeesService.getEmployeeById(id)
        .subscribe(
          employee => this.employee = employee,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
      }
      else{
        this.title = 'New Employee';
        this.isCreate = true;
      }
            
    });
  }

  save() {
    var result;

    if (!this.isCreate){
      result = this.employeesService.updateEmployee(this.employee);
    } else {
      result = this.employeesService.addEmployee(this.employee);
    }

    result.subscribe(data => this.router.navigate(['employees']),
        err => {
            console.log("Could not do Update.");
            this.router.navigate(['employees']);
          });
  }
}
