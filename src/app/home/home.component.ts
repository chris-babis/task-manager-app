import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[] = [];
  projectsSub: Subscription;
  username: string;

  constructor(private projectService:ProjectService, private userService:UserService) { }

  ngOnInit(): void {
    this.username = this.userService.user.value.username;
    console.log(this.username);
        
    this.projectService.getUsersProjects();
    this.projectsSub = this.projectService.getProjects().subscribe((projects:Project[]) => this.projects = projects);
  }

}
