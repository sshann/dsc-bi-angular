import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from '../../shared/models/User.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<UserFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isNew = this.data == null && this.data.user == null;
    this.form = new FormGroup({
      email: new FormControl(this.data && this.data.user ? this.data.user.email : '', [Validators.required, Validators.email]),
      name: new FormControl(this.data && this.data.user ? this.data.user.name : '', [Validators.required]),
      password: new FormControl(this.data && this.data.user ? this.data.user.password : '', [Validators.required]),
      role: new FormControl(this.data && this.data.user ? this.data.user.role : '', [Validators.required]),
      phone: new FormControl(this.data && this.data.user ? this.data.user.phone : '', [])
    });
  }

  isAdmin(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')).role === 'admin';
  }


  onSubmit() {
    const user: User = {
      name: this.form.value.name,
      password: this.form.value.password,
      role: this.form.value.role,
      phone: this.form.value.phone,
      email: this.form.value.email,
      username: this.form.value.name.split(' ').join(''),
      company_id: this.data.company_id
    };

    if (this.data && this.data.user) {
      user.id = this.data.user.id;
    }

    if (this.isNew) {
      this.userService.create(user).subscribe(response => {
        this.snackBar.open('User created! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);

      });
    } else {
      this.userService.update(user, false).subscribe(response => {
        this.snackBar.open('User Updated! ', null, {
          duration: 3000,
        });
        this.dialogRef.close(response);
      });
    }
  }

}
