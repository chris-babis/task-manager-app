import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{

  headers = new HttpHeaders();

  
  constructor(private http:HttpClient, private userService:UserService) { }

  ngOnInit() {
   
  }

  getUsersProjects() {      
    this.headers = this.headers.set('Authorization', `Bearer ${this.userService.user.value.token}`);
    return this.http.get("http://localhost:3000/projects", {headers: this.headers}).subscribe();
  }
}
