import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductData} from '../../../shared/models/product-data.model';
import {ProductDataService} from '../product-data.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(private productService: ProductDataService,
              private dialogRef: MatDialogRef<ProductFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isNew = this.data == null;
    this.form = new FormGroup({
      date: new FormControl(
        this.data ? this.data.product.date : new Date().toISOString().substring(0, 10),
        [Validators.required]),
      category: new FormControl(this.data ? this.data.product.category : '', [Validators.required]),
      name: new FormControl(this.data ? this.data.product.name : '', [Validators.required]),
      current_stock: new FormControl(this.data ? this.data.product.current_stock : '', [Validators.required]),
      current_value: new FormControl(this.data ? this.data.product.current_value : '', []),
      description: new FormControl(this.data ? this.data.product.description : '', [])
    });
  }


  onSubmit() {
    const product: ProductData = {
      category: this.form.value.category,
      description: this.form.value.description,
      current_value: this.form.value.current_value,
      date: this.form.value.date,
      current_stock: this.form.value.current_stock,
      name: this.form.value.name,
      company_id: JSON.parse(localStorage.getItem('currentUser')).company_id
    };

    if (this.data) {
      product.id = this.data.product.id;
      product._rev = this.data.product._rev;
    }

    if (this.isNew) {
      this.productService.create(product).subscribe(response => {
        this.snackBar.open('Product created! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);

      });
    } else {
      this.productService.update(product).subscribe(response => {
        this.snackBar.open('Product Updated! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);
      });
    }
  }

}
