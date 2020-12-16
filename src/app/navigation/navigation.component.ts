import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnDestroy {

  projects: Project[] = [];
  projectsSub: Subscription

  constructor(private projectService:ProjectService, private userService:UserService) { }

  ngOnInit(): void {
    this.projectService.getUsersProjects();
    this.projectsSub = this.projectService.getProjects().subscribe((projects:Project[]) => this.projects = projects);
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

  logout() {
    this.userService.logoutUser();
  }



}
