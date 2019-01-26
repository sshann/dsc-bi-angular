import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {TransactionData} from '../../shared/models/transaction-data.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable()
export class TransactionDataService {
  private userURL = environment.apiBaseURL + '/api/TransactionData';

  constructor(private http: HttpClient) {
  }

  list(): Observable<TransactionData[]> {
    const url = this.userURL;
    return this.http.get<TransactionData[]>(url, httpOptions)
      .pipe(
        map(response => {
          console.log('response', response);
          return response;
        }));
  }

  create(): TransactionData {
    return [];
  }

  get(): TransactionData {
    return [];
  }

  update(): TransactionData[] {
    return [];
  }

  delete(): TransactionData[] {
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
