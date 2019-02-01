import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {EmployeeData} from '../../../shared/models/employee-data.model';
import {EmployeeDataService} from '../employee-data.service';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css']
})
export class EmployeeFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;
  startDate = this.data ? new Date(this.data.employee.date) : new Date();

  constructor(private employeeService: EmployeeDataService,
              private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isNew = this.data == null;
    this.form = new FormGroup({
      date: new FormControl(
        this.data ? this.data.employee.date : new Date().toISOString().substring(0, 10),
        [Validators.required]),
      reference: new FormControl(this.data ? this.data.employee.reference : '', []),
      total_teams: new FormControl(this.data ? this.data.employee.total_teams : '', [Validators.required]),
      total_salary_paid: new FormControl(this.data ? this.data.employee.total_salary_paid : '', [Validators.required]),
      total_employees: new FormControl(this.data ? this.data.employee.total_employees : '', [Validators.required]),
      department: new FormControl(this.data ? this.data.employee.department : '', [Validators.required])
    });
  }


  onSubmit() {
    const employee: EmployeeData = {
      reference: this.form.value.reference,
      department: this.form.value.department,
      total_employees: this.form.value.total_employees,
      date: this.form.value.date,
      total_salary_paid: this.form.value.total_salary_paid,
      total_teams: this.form.value.total_teams,
      company_id: JSON.parse(localStorage.getItem('currentUser')).company_id
    };

    if (this.data) {
      employee.id = this.data.employee.id;
      employee._rev = this.data.employee._rev;
    }

    if (this.isNew) {
      this.employeeService.create(employee).subscribe(response => {
        this.snackBar.open('Employee created! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);

      });
    } else {
      this.employeeService.update(employee).subscribe(response => {
        this.snackBar.open('Employee Updated! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);
      });
    }
  }

}
