import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = environment.title;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.userService.isAuthenticate();
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('currentUser')).role === 'admin';
  }
}
