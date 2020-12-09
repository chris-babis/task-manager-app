import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { take, map, tap, catchError} from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ProjectService } from '../shared/project.service';
import { Observable } from 'rxjs';
import { Project } from '../shared/project.model';



@Injectable({providedIn: 'root'})
export class OwnerProject implements CanActivate {
  constructor(private userService: UserService,private router: Router, private projectService:ProjectService) {}
  
    canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {   
        return this.projectService.getProject(route.params.id).pipe(
            map(project => {
                if(project.ownerId._id !== this.userService.user.value._id) return false;
                return true;
            }),
            tap(isOwner => {
                if(!isOwner) this.router.navigate(['user']);
            }),
            catchError(err => this.router.navigate(['user']))
        )
    }
}  