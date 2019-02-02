import {Injectable} from '@angular/core';
import {User} from '../shared/models/User.model';
import {LoginOutput} from '../shared/models/LoginOutput.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';
import {EmployeeData} from '../shared/models/employee-data.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {
  private userURL = environment.apiBaseURL + '/api/Users';
  private userChanged = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  isUserChanged(): Observable<boolean> {
    return this.userChanged.asObservable();
  }

  login(user: User): Observable<any> {
    return this.http.post<LoginOutput>(this.userURL + '/login?include=user', user, httpOptions).pipe(
      map(loginOutput => {
        if (loginOutput.id && loginOutput.userId) {
          localStorage.setItem('currentUser', JSON.stringify(loginOutput.user));
          localStorage.setItem('accessToken', loginOutput.id);
          this.userChanged.next(true);
        }
        return loginOutput;
      }), catchError(this.handleError('login', null)));
  }

  list(company_id: string): Observable<User[]> {
    const url = this.userURL + '?filter[where][company_id]=' + company_id;
    return this.http.get<User[]>(url);
  }

  delete(user: User): Observable<object> {
    const url = this.userURL + '/' + user.id;
    return this.http.delete(url, httpOptions);
  }

  create(user: User): Observable<User> {
    const url = this.userURL;
    return this.http.post<User>(url, user, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.userURL + '/logout', httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        this.userChanged.next(false);
      }),
      catchError(this.handleError('logout User')));
  }

  update(user: User, isCurrentUser: boolean): Observable<any> {
    return this.http.put(this.userURL, user, httpOptions).pipe(
      map(users => {
        if (isCurrentUser) {
          localStorage.setItem('currentUser', JSON.stringify(users));
        }
        return users;
      }));
  }

  getUserRoles(id: string): Observable<any> {
    const url = this.userURL + '/roles?id=' + id;
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
