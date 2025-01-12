import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public employees !: Employee[];
  public editEmployee !: Employee;
  public deleteEmployee !: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  // Component Functionality for getting the employee
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Component Functionality for adding a employee
  public onAddEmloyee(addForm: NgForm): void {

    const addEmployeeForm = document.getElementById('add-employee-form');
    if (addEmployeeForm) {
      addEmployeeForm.click();
    }
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // Component Functionality for updating a employee
  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Component Functionality for deleting a employee
  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Component Functionality for searching a employee
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModal(mode: string, employee?: Employee): void {
    const container = document.getElementById('main-container');
    
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
    
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      } else if (mode === 'edit' && employee) {
        this.editEmployee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
      } else if (mode === 'delete' && employee) {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
    
      container.appendChild(button);
      button.click();
    }
  }
  
  
  }
  