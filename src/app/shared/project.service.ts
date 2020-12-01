import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{

  headers = new HttpHeaders();
  projects: Project[] = [];
  projectsSub = new BehaviorSubject<Project[]>([]);

  
  constructor(private http:HttpClient, private userService:UserService) { }

  ngOnInit() {
   
  }

  getUsersProjects() {      
    this.headers = this.headers.set('Authorization', `Bearer ${this.userService.user.value.token}`);
    this.http.get("http://localhost:3000/projects", {headers: this.headers}).subscribe((projects:Project[]) => {
      this.projects = projects;
      this.projectsSub.next([...this.projects]);
    })
  }

  getProjects(){
    return this.projectsSub.asObservable();
  }
}
