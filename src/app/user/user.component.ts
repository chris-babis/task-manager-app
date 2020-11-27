import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headerText;
  redirectText;
  redirectLink;

  err:string;
  errSub:Subscription;
  constructor(private route:Router, private userService:UserService) { }

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

    this.errSub = this.userService.getErrorMessage().subscribe(err => this.err = err);
  }

  handleUser(email,password) {
    if(this.headerText === `register`) this.userService.registerUser(email.value,password.value);
    else {
      
    }
  }

}
 