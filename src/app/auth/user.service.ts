import {Injectable} from '@angular/core';
import {User} from '../shared/models/User.model';
import {LoginOutput} from '../shared/models/LoginOutput.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {
  private userURL = environment.apiBaseURL + '/api/Users';

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post<LoginOutput>(this.userURL + '/login?include=user', user, httpOptions).pipe(
      map(loginOutput => {
        if (loginOutput.id && loginOutput.userId) {
          localStorage.setItem('currentUser', JSON.stringify(loginOutput.user));
          localStorage.setItem('accessToken', loginOutput.id);
        }
        return loginOutput;
      }), catchError(this.handleError('login', null)));
  }

  logout(): Observable<any> {
    return this.http.post(this.userURL + '/logout', httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
      }),
      catchError(this.handleError('logout User')));
  }

  getUserRoles(id: string): Observable<any> {
    const url = this.userURL + '/getRolesById?id=' + id;
    return this.http.get<any>(url, httpOptions).pipe(
      map(response => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.role = response.payload.roles[0];
        /*The current app have being designed as a user having only one role*/
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user.role;
      }),
      catchError(this.handleError('Get user roles', null)));
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
