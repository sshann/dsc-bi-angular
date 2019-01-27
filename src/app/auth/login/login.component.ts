import { Component, OnInit} from '@angular/core';
import { User } from '../../shared/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
	  this.user = {
		  email : " ",
		  password: " "
	  };
  }

  login(email:string, password:string): void {
	  this.user.email = email;
	  this.user.password = password;
	  this.userService.login(this.user).subscribe();

}


}
