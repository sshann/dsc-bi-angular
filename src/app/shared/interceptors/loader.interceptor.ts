import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize, map} from 'rxjs/operators';
import 'rxjs/add/observable/throw';

/* Source code at https://medium.com/@johnmeguira/intercept-all-http-calls-with-angular-5-to-display-a-loader-281924b73ad8 */

@Injectable()
export class HTTPStatus {
  private request: BehaviorSubject<boolean>;

  constructor() {
    this.request = new BehaviorSubject(false);
  }

  setHttpStatus(status: boolean) {
    this.request.next(status);
  }

  getHttpStatus(): Observable<boolean> {
    return this.request.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  constructor(private status: HTTPStatus) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return Observable.throw(error);
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
