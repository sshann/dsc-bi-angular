import { Component, OnInit } from '@angular/core';
//import {User} from '../../shared/models/User.model';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	
	user:User;
	switching: string = "Enable";
	showMSG: boolean = false;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  this.user = currentUser;
	  this.displayData(this.user);
  }

  
  displayData(current:any): void{
	  this.user.name = current.name ;
	  this.user.phone = current.phone;
	  this.user.username = current.username;
	  this.user._rev = current._rev;
  }
  
  showNote():void{
	  this.showMSG = !this.showMSG;
  }
  
  update():void{
	  console.log(this.user);
	  this.userService.update(this.user).subscribe(users => {
		  console.log(users);
		  this.user = users
	  });
  }

}
