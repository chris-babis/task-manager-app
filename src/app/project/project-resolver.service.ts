import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';


@Injectable({providedIn:'root'})
export class ProjectResolver implements Resolve<Project>  {

  constructor(private projectService: ProjectService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> | Promise<Project> | Project{
    return this.projectService.getProject(route.params.id);
  }
}
