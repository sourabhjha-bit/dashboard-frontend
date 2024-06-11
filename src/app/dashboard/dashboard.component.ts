import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  EmployeeArray: any[] = [];
  isEmpty = true;
  isResultLoaded = false;
  no_of_employees = 0;

  employee_name: string = '';
  employee_email: string = '';
  employee_mobile: Number = 0;
  currentEmployeeID = '';

  constructor(private http: HttpClient) {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.http
      .get('http://localhost:8085/api/v1/employee/get-all-employees')

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.EmployeeArray = resultData;
        if (this.EmployeeArray.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.no_of_employees = this.EmployeeArray.length;
        }
      });
  }
}
