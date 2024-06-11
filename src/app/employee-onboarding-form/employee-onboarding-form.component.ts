import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-onboarding-form',
  templateUrl: './employee-onboarding-form.component.html',
  styleUrls: ['./employee-onboarding-form.component.css'],
})
export class EmployeeOnboardingFormComponent {
  errors = {
    name: '',
    email: '',
    mobile: '',
  };

  EmployeeArray: any[] = [];
  isValid = true;
  isEmpty = true;
  isResultLoaded = false;
  isUpdateFormActive = false;

  employee_name: string = '';
  employee_email: string = '';
  employee_mobile: Number = 0;
  currentEmployeeID = '';

  validateName() {
    if (!this.employee_name) {
      this.errors.name = 'Name is required';
      this.isValid = false;
    } else {
      this.errors.name = '';
      this.isValid = true;
    }
  }

  validateEmail() {
    if (!this.employee_email) {
      this.errors.email = 'Email is required';
      this.isValid = false;
    } else {
      this.errors.email = '';
      this.isValid = true;
    }
  }

  validateMobile() {
    if (!this.employee_mobile) {
      this.errors.mobile = 'Mobile is required';
      this.isValid = false;
    } else {
      this.errors.mobile = '';
      this.isValid = true;
    }
  }

  constructor(private http: HttpClient, private router: Router) {
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

  register() {
    let bodyData = {
      employee_name: this.employee_name,
      employee_email: this.employee_email,
      employee_mobile: this.employee_mobile,
    };

    this.http
      .post('http://localhost:8085/api/v1/employee/save', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Successfully');
        this.getAllEmployee();

        this.employee_name = '';
        this.employee_email = '';
        this.employee_mobile = 0;
      });
  }
  save() {
    if (this.currentEmployeeID == '') {
      if (this.errors.name || this.errors.email || this.errors.mobile) {
        return;
      }
      if (!this.isValid) {
        return;
      }
      this.register();
    } else {
      alert('Failed to register');
      this.router.navigate(['/employee-list']);
      console.log(
        this.employee_name,
        this.employee_email,
        this.employee_mobile
      );
    }
  }

  currentStep = 1;

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}
