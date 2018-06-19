import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/do';

import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Token Interceptor: Getting JWT-Token.......');
        console.log("Token Interceptor: JWT-Token: "+this.auth.getToken());
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
        });

        return next.handle(authReq).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('Token Interceptor: Checking error.......');
                    if (err.status === 401) {
                        console.log('Token Interceptor: Redirecting to login URL.......')
                        this.router.navigateByUrl('/login');
                    }
                    console.log(err.error.information);
                }
            });
    }
}