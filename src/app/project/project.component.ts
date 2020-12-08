import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;

  constructor(private route:ActivatedRoute, private projectService:ProjectService) { }

  ngOnInit(): void {
    this.route.data.subscribe((projectData:Data) => {
      this.project = projectData[0];      
    });
  }

}
