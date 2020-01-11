import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      });
    }
    return next.handle(req).pipe(
      tap(() => {
        console.log('Intercept');
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error: ]', error);

        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true
            }
          });
        }
        return throwError(error);
      }));
  }

}