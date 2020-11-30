import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.getUsersProjects();
  }

}
