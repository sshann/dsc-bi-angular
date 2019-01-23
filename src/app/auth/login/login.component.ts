import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../shared/User';
import {UserService} from '../user.service';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  login(form: NgForm): void {
    this.user = {
      email: form.value.email,
      password: form.value.password
    };
    this.userService.login(this.user).subscribe();
  }

}
