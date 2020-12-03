import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from './user.service';
import { take, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
    canActivate(): boolean|UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.userService.user.pipe(
            take(1),
            map(user => !!user),
            tap(user => {
                if(!user) this.router.navigate(['/login']);
            })
        )
    }
}