import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the cookie
    const clonedRequest = req.clone({
      withCredentials: true // This will include cookies with the request
    });

    // Pass on the cloned request instead of the original request
    return next.handle(clonedRequest);
  }
}
