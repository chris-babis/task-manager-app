import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-manager-app';

  constructor(private userService:UserService, private router:Router){}

  ngOnInit() {
    this.userService.autoLogin();
  }
}
