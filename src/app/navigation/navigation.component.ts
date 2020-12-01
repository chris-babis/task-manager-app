import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  projects: Project[] = [];
  projectsSub: Subscription

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.getUsersProjects();
    this.projectsSub = this.projectService.getProjects().subscribe((projects:Project[]) => this.projects = projects);
  }

}
