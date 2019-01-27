import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../shared/models/User.model';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  returnURL: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.returnURL = params['return'] || './');
  }

  login(form: NgForm): void {
    this.user = {
      email: form.value.email,
      password: form.value.password
    };
    this.userService.login(this.user).subscribe(
      user => {
        if (user) {
          /* Added a timer here as the user roles were not being returned without it. */
          setTimeout(() => {
            this.userService.getUserRoles(user.userId).subscribe(roles => {
              let message: string;
              this.router.navigate([this.returnURL]);
              message = 'Login successful! ';

              if (!roles) {
                message += 'You have no access permissions! ';
              }

              this.snackBar.open(message, null, {
                duration: 4000,
              });
            });
          }, 1000);
        } else {
          this.snackBar.open('Failed to login, user not registered! ', null, {
            duration: 3000,
          });
        }
      }
    );

  }

}
