import {Injectable} from '@angular/core';
import {User} from '../shared/User';
import {LoginOutput} from '../shared/LoginOutput';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private userURL = environment.apiBaseURL + '/api/Users';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<any> {
    return this.http.post<LoginOutput>(this.userURL + '/login', user, httpOptions).pipe(map(loginOutput => {
      if (loginOutput.id && loginOutput.userId) {
        localStorage.setItem('currentUser', loginOutput.userId);
        localStorage.setItem('accessToken', loginOutput.id);
        console.log('accepted');
        this.router.navigate(['./']);
      }
      return loginOutput;
    }), catchError(this.handleError('login', [])));
  }

  logout(): Observable<any> {
    let accessToken = localStorage.getItem('accessToken');
    return this.http.post(this.userURL + '/logout', httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        console.log('successfully logged out user');
        this.router.navigate(['./login']);
      }),
      catchError(this.handleError('logout User')));
  }

  isAuthenticate() {
    return localStorage.getItem('accessToken') != null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
