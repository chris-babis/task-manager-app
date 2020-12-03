import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private userService: UserService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(request.url  === 'http://localhost:3000/users/login' || request.url === 'http://localhost:3000/users') {}
        else {
         
          
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.userService.user.value.token}`
                }
              });
        }
        
        return next.handle(request);
      }
}