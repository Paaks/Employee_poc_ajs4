import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Employee} from "./employee";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EmployeesService implements OnInit {

  private server : string = 'http://localhost:8080';
  private url: string = this.server + '/emirates/employee/';
  
  private headers : Headers = new Headers({ 'Content-Type': 'application/json' });
  private options : RequestOptions = new RequestOptions({ headers: this.headers });
  employeeListUpdated : Subject<any> = new Subject();
  

  constructor(private http: Http) { }

  ngOnInit() {
    /*this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers }); */
  }
  getEmployees(){
    return this.http.get(this.getEmployeeUrl("list"))
      .map(res => res.json());
  }

  getEmployeeById(id){
    return this.http.get(this.getEmployeeUrl(id))
      .map(res => {
        this.employeeListUpdated.next(res.json());
        return res.json();
      });
  }

  addEmployee(employee){
    return this.http.post(this.getEmployeeUrl("create"), JSON.stringify(employee), this.options)
      .map(res => res.json());
  }

  updateEmployee(employee){
    return this.http.put(this.getEmployeeUrl("update/"+employee.id), JSON.stringify(employee), this.options)
      .map(res => res.json());
  }

  deleteEmployee(employee : Employee){
    return this.http.delete(this.getEmployeeUrl("delete/"+employee.id),JSON.stringify(employee))
      .map(res => res.json());
  }

  downloadEmployeeList(){
    return this.http.get(this.getEmployeeUrl("download"))
      .map(res => res.json());
  }

  uploadEmployee(formadata, options){
    return this.http.post(this.getEmployeeUrl("upload"), formadata, options)
      .map(res => res.json());
      
      }

  getServerDetails(){
    return this.http.get(this.getEmployeeUrl("serverDetails"))
      .map(res => res.json());
  }

  private getEmployeeUrl(action){
    return this.url + action;
  }
}
