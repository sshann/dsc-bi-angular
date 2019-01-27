import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout().subscribe(
      response => {
          this.router.navigate(['./']);
          this.snackBar.open('Logout successful! ', null, {
            duration: 3000,
          });
      }
    );

  }

}
