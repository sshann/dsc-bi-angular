import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {TransactionData} from '../../../shared/models/transaction-data.model';

@Component({
  selector: 'app-transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
  styleUrls: ['./transaction-form-dialog.component.css']
})
export class TransactionFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(private dialogRef: MatDialogRef<TransactionFormDialogComponent>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      reference: new FormControl('', []),
      description: new FormControl('', [])
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
    this.dialogRef.close(transaction);
  }

}
