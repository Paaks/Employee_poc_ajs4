import { Component, OnInit, OnDestroy } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import {EmployeesService} from "./shared/employees.service";
import {Employee} from "./shared/employee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  employeesOrg: Employee[] = [];
  Name: string;
  myFile: File;
  formData: FormData;
  employeeListObsSubscription : Subscription;
  downloadUrl : string;
  searchKey: string;

  constructor(
    private employeesService: EmployeesService
  ){}

  ngOnInit() {
    this.employeesService.getEmployees()
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.employeesOrg = data;
      });

      this.employeesService.getServerDetails()
      .subscribe(data => {
        console.log(data);
        this.setDownloadUrl(data);
      });
  }

  fileChange(files: any){
    console.log(files);
    this.myFile = files[0];
  }

  deleteEmployee(employee){
    if (confirm("Are you sure you want to delete " + employee.firstName + "?")) {
      var index = this.employees.indexOf(employee);
      this.employees.splice(index, 1);

      this.employeesService.deleteEmployee(employee)
        .subscribe(data => this.employees = data,
          err => {
            alert("Could not delete employee.");
            // Revert the view back to its original state
            this.employees.splice(index, 0, employee);
          });
    }
    else{

    }
  }

  download(){
    console.log('Initiate Download');
    this.employeesService.downloadEmployeeList()
    .subscribe(null,
          err => {
            alert("Could not download .");
          });
  }
  /* Now send your form using FormData */
onUpload(): void {
    this.formData = new FormData();
    this.formData.append("Name", this.Name);
    this.formData.append("file", this.myFile);
    let headers = new Headers({});
    let options = new RequestOptions({
        headers: headers
    });
    this.employeesService.uploadEmployee(this.formData, options)
    .subscribe(data => this.employees = data,
              err => {
                alert("Could not upload the file selected.");
              });
  }

  onSearch() : void {
    this.employees = [];
   if(undefined === this.searchKey || this.searchKey.trim().length === 0){
      this.employees = this.employeesOrg;
    }
  else{
       this.employeesService.getEmployeeById(this.searchKey)
        .subscribe(data => { 
                      this.setData(data);},
                  err => {
                    console.log('Search error');
                  });
    }
   }

  setData(data){
   this.employees.push(data);
   console.log('Employees : ' + JSON.stringify(this.employees));
  }

  setDownloadUrl(serverDetails){
   this.downloadUrl = serverDetails.scheme + '://' + serverDetails.host + ':' + serverDetails.port + '/emirates/employee/download';
  }
   ngOnDestroy(){
     //this.employeeListObsSubscription.unsubscribe();
  }
 
}
