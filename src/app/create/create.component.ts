import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
  }

  createProject(title:string) {
    this.projectService.createProject(title);
  }

}
