import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem('currentUser');
    const accessToken = localStorage.getItem('accessToken');

    if (currentUser && accessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', accessToken)
      });
    }

    return next.handle(request);
  }


}
