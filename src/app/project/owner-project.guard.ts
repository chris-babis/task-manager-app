import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { take, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';


@Injectable({providedIn: 'root'})
export class OwnerProject implements CanActivate {
  constructor(private userService: UserService,private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.userService.user.pipe(
            take(1),
            map(user => {
                const isOwner = user.projects.find(project => project._id === route.paramMap.get("id"));
                if(!isOwner) return false
                else return true;
            }),
            tap(userProject => {
               if(!userProject) this.router.navigate(['/user'])
            })
        )
    }
}  