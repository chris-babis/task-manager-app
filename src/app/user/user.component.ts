import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headerText;
  redirectText;
  redirectLink;

  constructor(private route:Router) { }

  ngOnInit(): void {
    const path = this.route.url;
    if(path === `/register`){
      this.headerText = 'register'
      this.redirectText = 'login'
      this.redirectLink = '/login'
    } else {
      this.headerText = 'login'
      this.redirectText = 'sign up'
      this.redirectLink = '/register'
    }
  }

}
