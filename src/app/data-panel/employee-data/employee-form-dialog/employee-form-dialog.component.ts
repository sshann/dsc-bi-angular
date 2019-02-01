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
      category: new FormControl(this.data ? this.data.employee.category : '', [Validators.required]),
      name: new FormControl(this.data ? this.data.employee.name : '', [Validators.required]),
      current_stock: new FormControl(this.data ? this.data.employee.current_stock : '', [Validators.required]),
      current_value: new FormControl(this.data ? this.data.employee.current_value : '', []),
      description: new FormControl(this.data ? this.data.employee.description : '', [])
    });
  }


  onSubmit() {
    const employee: EmployeeData = {
      category: this.form.value.category,
      description: this.form.value.description,
      current_value: this.form.value.current_value,
      date: this.form.value.date,
      current_stock: this.form.value.current_stock,
      name: this.form.value.name,
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
