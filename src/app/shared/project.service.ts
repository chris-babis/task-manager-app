import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{

  projects: Project[] = [];
  projectsSub = new BehaviorSubject<Project[]>([]);
  
  constructor(private http:HttpClient, private userService:UserService) { }

  ngOnInit() {
   
  }

  getUsersProjects() {      

    this.http.get("http://localhost:3000/projects").subscribe((projects:Project[]) => {
      this.projects = projects;
      this.projectsSub.next([...this.projects]);
    })
  }

  getProjects(){
    return this.projectsSub.asObservable();
  }

  createProject(title) {
    const project: Project = {
      title,
      ownerId: this.userService.user.value._id
    }

    this.http.post(`http://localhost:3000/projects`, {project}).subscribe((resProject:Project) => {
      this.projects.push(resProject);
      this.projectsSub.next([...this.projects]);
    });

  }
}
