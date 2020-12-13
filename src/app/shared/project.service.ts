import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Project } from './project.model';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{

  projects: Project[] = [];
  projectsSub = new BehaviorSubject<Project[]>([]);

  constructor(
    private http:HttpClient, 
    private userService:UserService,
    private router:Router) { }

  
  ngOnInit() {
   
  }

  getUsersProjects() {      
    return this.http.get("http://localhost:3000/projects").subscribe((projects:Project[]) => {
      this.projects = projects;
      this.userService.user.value.projects = projects;
      this.projectsSub.next([...this.projects]);
    })
  }

  getProjects(){
    return this.projectsSub.asObservable();
  }

  createProject(title) {
    const project: Project = {
      title,
      ownerId: this.userService.user.value
    }

    this.http.post(`http://localhost:3000/projects`, {project}).subscribe((resProject:Project) => {
      this.projects.push(resProject);
      this.userService.user.value.projects.push(resProject);
      this.projectsSub.next([...this.projects]);
      this.router.navigate(['/user/project', resProject._id]);
    });
  }

  getProject(_id:string) {
    return this.http.get<Project>(`http://localhost:3000/project/${_id}`)
  }

  
}
