import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class BusinessManagerGuard implements CanActivate {

  constructor(private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = JSON.parse(localStorage.getItem('currentUser')).role;
    const isBM = userRole === 'business_manager' || userRole === 'business_owner' || userRole === 'admin';

    if (!isBM) {
      this.snackBar.open('Permission denied. You can not access this module', null, {
        duration: 3000,
      });
    }
    return isBM;
  }

}
