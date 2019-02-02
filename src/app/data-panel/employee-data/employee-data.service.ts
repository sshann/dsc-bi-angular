import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {EmployeeData} from '../../shared/models/employee-data.model';
import {ProductData} from '../../shared/models/product-data.model';

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Origin': '*'
});

@Injectable()
export class EmployeeDataService {
  private userURL = environment.apiBaseURL + '/api/EmployeeData';

  constructor(private http: HttpClient) {
  }

  list(): Observable<EmployeeData[]> {
    const company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;
    const url = this.userURL + '?filter[order]=date DESC&filter[where][company_id]=' + company_id;
    return this.http.get<EmployeeData[]>(url, {headers: httpOptions});
  }

  create(employee: EmployeeData): Observable<EmployeeData> {
    const url = this.userURL;
    return this.http.post<EmployeeData>(url, employee, {headers: httpOptions});
  }

  update(employee: EmployeeData): Observable<EmployeeData> {
    const url = this.userURL + '/' + employee.id;
    return this.http.put<EmployeeData>(url, employee, {headers: httpOptions});
  }

  delete(employee: EmployeeData): Observable<object> {
    const url = this.userURL + '/' + employee.id;
    return this.http.delete(url, {headers: httpOptions});
  }

  import(json: EmployeeData[]): Observable<EmployeeData[]> {
    const url = this.userURL;
    return this.http.post<EmployeeData[]>(url, json, {headers: httpOptions});
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
