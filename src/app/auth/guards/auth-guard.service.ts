import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.userService.isAuthenticate();

    if (!isAuthenticated) {
      this.snackBar.open('Permission denied. You need to login to access this module', null, {
        duration: 3000,
      });
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
    }
    return isAuthenticated;
  }

}
