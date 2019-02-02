import {Injectable} from '@angular/core';
import {Company} from '../shared/Company';
import {CompanyOutput} from '../shared/CompanyOutput';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {CompanyReport} from '../shared/models/report.model';
import {Subject} from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class CompanyService {
  private companyURL = environment.apiBaseURL + '/api/Companies';
  private companyChanged = new Subject<Company>();

  constructor(private http: HttpClient) {
  }

  haveCompanyChanged(): Observable<Company> {
    return this.companyChanged.asObservable();
  }

  getCompanyList(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyURL)
      .pipe(
        tap(() => {
          console.log('List of companies retrieved');
        }));
  }

  get(id: string, filter?: string): Observable<Company> {
    let url = this.companyURL + '/' + id;
    if (filter) {
      url += '?' + filter;
    }
    return this.http.get<Company>(url);
  }

  deleteCompany(comp: Company | number): Observable<Company> {
    const id = typeof comp === 'number' ? comp : comp.id;
    // const url = `${this.companyURL}/${id}`;

    return this.http.delete<Company>(this.companyURL + '/' + id, httpOptions).pipe(
      tap(() => {
        console.log('The selected company is deleted');
      })
    );
  }

  addCompany(comp: Company): Observable<Company> {
    return this.http.post<Company>(this.companyURL, comp, httpOptions).pipe(
      tap((company: Company) => {
        console.log('Company' + comp.name + 'is added');
      })
    );
  }

  updateCompany(comp: Company): Observable<CompanyOutput> {
    return this.http.put<CompanyOutput>(this.companyURL, comp, httpOptions).pipe(tap((company) => {
        this.companyChanged.next(company);
        console.log('Company is updated');
      })
    );
  }

  getReport(company_id: string): Observable<CompanyReport> {
    const url = this.companyURL + '/report?id=' + company_id;
    return this.http.get<{ payload: CompanyReport }>(url, httpOptions).pipe(map(response => {
        return response.payload;
      }
    ));
  }

}
