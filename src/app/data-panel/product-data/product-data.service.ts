import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {EmployeeData} from '../../shared/employee-data.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProductDataService {
  private userURL = environment.apiBaseURL + '/api/Users';

  constructor(private http: HttpClient) {
  }

  list(): EmployeeData[] {
    return [];
  }

  create(): EmployeeData {
    return [];
  }

  get(): EmployeeData {
    return [];
  }

  update(): EmployeeData[] {
    return [];
  }

  delete(): EmployeeData[] {
    return [];
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
