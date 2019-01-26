import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAdmin = JSON.parse(localStorage.getItem('currentUser')).role.name === 'admin';

    if (!isAdmin) {
      this.snackBar.open('Permission denied. You can not access this module', null, {
        duration: 3000,
      });
    }
    return isAdmin;
  }

}
