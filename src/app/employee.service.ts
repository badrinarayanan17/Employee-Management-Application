// // We need to create functions that can reach to backend
// // Making http request using HttpClient

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Employee } from './employee';
// import { environment } from '../environments/environment.development';

// @Injectable({
//   providedIn: 'root'
// })

// export class EmployeeService {

//   private apiServerUrl = environment.apiBaseUrl;

//   constructor(private http:HttpClient) { }

//   
//   public getEmployees():Observable<Employee[]>{

//     return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
//   }

//   
//   public addEmployee(employee:Employee):Observable<Employee>{
//     return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
//   }

//  
//   public updateEmployee(employee:Employee):Observable<Employee>{
//     return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
//   }


//   public deleteEmployee(employeeId:number):Observable<void>{
//     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
//   }



// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../environments/environment.development';


@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}


  // Function to get a list of employees
  // Observable is a generic 
  public getEmployees(): Observable<Employee[]> {
       // Get method is also a generic
       // `${}` -> js notation that used to put variables and a string at the same time
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  // Function to add a employee
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }


  // Function to update a employee
  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  // Function to delete a employee
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}

// Just mirroring of backend