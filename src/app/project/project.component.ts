import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;
  allUsers: User[] = [];


  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((projectData:Data) => {
      this.project = projectData[0];      
      this.allUsers.push(this.project.ownerId);
      if(this.project.collaborators.length > 1) this.allUsers = this.allUsers.concat(this.project.collaborators);
    });
  }

}
