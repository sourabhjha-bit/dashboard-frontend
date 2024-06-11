import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';


import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeOnboardingFormComponent } from './employee-onboarding-form/employee-onboarding-form.component';
import { EmployeesDataTableComponent } from './employees-data-table/employees-data-table.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeOnboardingFormComponent,
    EmployeesDataTableComponent,
    SideNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee-sign-up', component: EmployeeOnboardingFormComponent },
      { path: 'employee-list', component: EmployeesDataTableComponent },
    ]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
