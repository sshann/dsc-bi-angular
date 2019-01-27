import { Injectable } from '@angular/core';
import {Company} from '../shared/Company';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};	

@Injectable()
export class CompanyService {
	
	private companyURL = environment.apiBaseURL + '/api/Companies';

  constructor(private http: HttpClient) { }
	
  
  getCompanyList(): Observable <Company[]>{
	  return this.http.get<Company[]>(this.companyURL)
	  .pipe(
	   tap(() => {
		   console.log("List of companies retrieved");
	   }))
  }
  
  deleteCompany (comp: Company | number): Observable<Company> {
  const id = typeof comp === 'number' ? comp : comp.id;
  //const url = `${this.companyURL}/${id}`;

  return this.http.delete<Company>(this.companyURL+"/"+id, httpOptions).pipe(
    tap(() => {
		console.log("The selected company is deleted");
	})
  );
}

addCompany(comp: Company): Observable<Company> {
  return this.http.post<Company>(this.companyURL, comp, httpOptions).pipe(
    tap((company:Company) => {
		console.log("Company"+comp.name+"is added");
	})
  );
}

updateCompany(comp:Company): Observable<Company>{
	return this.http.put<Company>(this.companyURL,comp,httpOptions).pipe(tap(() => {
		console.log("Company is updated");
	})
	);
}

}
