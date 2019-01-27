import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TransactionData} from '../../../shared/models/transaction-data.model';
import {TransactionDataService} from '../transaction-data.service';

@Component({
  selector: 'app-transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
  styleUrls: ['./transaction-form-dialog.component.css']
})
export class TransactionFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(private TDservice: TransactionDataService,
              private dialogRef: MatDialogRef<TransactionFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit() {
    this.isNew = this.data == null;
    this.form = new FormGroup({
      date: new FormControl(
        this.data ? this.data.transaction.date : new Date().toISOString().substring(0, 10),
        [Validators.required]),
      type: new FormControl(this.data ? this.data.transaction.type : '', [Validators.required]),
      amount: new FormControl(this.data ? this.data.transaction.amount : '', [Validators.required]),
      value: new FormControl(this.data ? this.data.transaction.value : '', [Validators.required]),
      reference: new FormControl(this.data ? this.data.transaction.reference : '', []),
      description: new FormControl(this.data ? this.data.transaction.description : '', [])
    });
  }


  onSubmit() {
    const transaction: TransactionData = {
      type: this.form.value.type,
      description: this.form.value.description,
      reference: this.form.value.reference,
      date: this.form.value.date,
      value: this.form.value.value,
      amount: this.form.value.amount
    };

    if (this.data) {
      transaction.id = this.data.transaction.id;
      // @ts-ignore
      transaction._rev = this.data.transaction._rev;
    }
    console.log(JSON.stringify(transaction));

    if (this.isNew) {
      this.TDservice.create(transaction).subscribe(response => {
        console.log(response);
        this.dialogRef.close(transaction);

      });
    } else {
      this.TDservice.update(transaction).subscribe(response => {
        console.log(response);
        this.dialogRef.close(transaction);

      });
    }
  }

}
