import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CompanyService} from '../../company.service';
import {Company} from '../../../shared/Company';

@Component({
  selector: 'app-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.css']
})
export class CompanyFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(private companyService: CompanyService,
              private dialogRef: MatDialogRef<CompanyFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isNew = this.data == null;
    this.form = new FormGroup({
      responsiblePhone: new FormControl(this.data ? this.data.company.responsiblePhone : '', [Validators.required]),
      name: new FormControl(this.data ? this.data.company.name : '', []),
      responsibleEmail: new FormControl(this.data ? this.data.company.responsibleEmail : '', [Validators.required, Validators.email]),
      responsibleName: new FormControl(this.data ? this.data.company.responsibleName : '', [Validators.required])
    });
  }


  onSubmit() {
    const company: Company = {
      name: this.form.value.name,
      responsibleName: this.form.value.responsibleName,
      responsibleEmail: this.form.value.responsibleEmail,
      responsiblePhone: this.form.value.responsiblePhone,
    };

    if (this.data) {
      company.id = this.data.company.id;
      company._rev = this.data.company._rev;
    }

    if (this.isNew) {
      this.companyService.addCompany(company).subscribe(response => {
        this.snackBar.open('Company created! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);

      });
    } else {
      this.companyService.updateCompany(company).subscribe(response => {
        this.snackBar.open('Company Updated! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);
      });
    }
  }

}
