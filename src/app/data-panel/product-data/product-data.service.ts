import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {ProductData} from '../../shared/models/product-data.model';

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*'
});

@Injectable()
export class ProductDataService {
  private userURL = environment.apiBaseURL + '/api/ProductData';

  constructor(private http: HttpClient) {
  }

  list(): Observable<ProductData[]> {
    const company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;
    const url = this.userURL + '?filter[order]=date DESC&filter[where][company_id]=' + company_id;
    return this.http.get<ProductData[]>(url, {headers: httpOptions});
  }

  create(product: ProductData): Observable<ProductData> {
    const url = this.userURL;
    return this.http.post<ProductData>(url, product, {headers: httpOptions});
  }

  update(product: ProductData): Observable<ProductData> {
    const url = this.userURL + '/' + product.id;
    return this.http.put<ProductData>(url, product, {headers: httpOptions});
  }

  delete(product: ProductData): Observable<object> {
    const url = this.userURL + '/' + product.id;
    return this.http.delete(url, {headers: httpOptions});
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
