import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-data-table',
  templateUrl: './employees-data-table.component.html',
  styleUrls: ['./employees-data-table.component.css'],
})
export class EmployeesDataTableComponent {
  EmployeeArray: any[] = [];
  isEmpty = true;
  isResultLoaded = false;
  isUpdateFormActive = false;

  employee_name: string = '';
  employee_email: string = '';
  employee_mobile: Number = 0;
  employee_id = '';

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
        }
      });
  }

  setUpdate(data: any) {
    this.employee_name = data.employee_name;
    this.employee_email = data.employee_email;
    this.employee_mobile = data.employee_mobile;
    this.employee_id = data.employee_id;
    console.log(typeof this.employee_id)
  }

  UpdateRecords() {
    let bodyData = {
      employee_id: this.employee_id,
      employee_name: this.employee_name,
      employee_email: this.employee_email,
      employee_mobile: this.employee_mobile,
    };

    this.http
      .put('http://localhost:8085/api/v1/employee/update', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Updated');
        this.getAllEmployee();
        this.employee_name = '';
        this.employee_email = '';
        this.employee_mobile = 0;
      });
  }

  save() {
    if (this.employee_id != '') {
      this.UpdateRecords();
    } else {
      alert('Failed to update');
    }
  }
  setDelete(data: any) {
    this.http
      .delete(
        'http://localhost:8085/api/v1/employee/delete' + '/' + data.employee_id,
        { responseType: 'text' }
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Deleted');
        this.getAllEmployee();

        this.employee_name = '';
        this.employee_email = '';
        this.employee_mobile = 0;
      });
  }
}
