import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  err:string;
  errSub:Subscription;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.user.value) this.router.navigate(['/user']);
    this.errSub = this.userService.getErrorMessage().subscribe(err => this.err = err);
  }

  loginUser(email,password) {
    this.userService.loginUser(email.value,password.value);
  }

}
