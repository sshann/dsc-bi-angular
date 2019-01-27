import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs/observable/of';
import {TransactionData} from '../../shared/models/transaction-data.model';

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true'
});

@Injectable()
export class TransactionDataService {
  private userURL = environment.apiBaseURL + '/api/TransactionData';

  constructor(private http: HttpClient) {
  }

  list(): Observable<TransactionData[]> {
    const url = this.userURL + '?filter[order]=date DESC';
    return this.http.get<TransactionData[]>(url, {headers: httpOptions});
  }

  create(transaction: TransactionData): Observable<TransactionData> {
    const url = this.userURL;
    return this.http.post<TransactionData>(url, transaction, {headers: httpOptions});
  }

  update(transaction: TransactionData): Observable<TransactionData> {
    const url = this.userURL + '/' + transaction.id;
    return this.http.put<TransactionData>(url, transaction, {headers: httpOptions});
  }

  //
  // delete(): TransactionData[] {
  //   return [];
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
