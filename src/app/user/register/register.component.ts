import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  err:string;
  errSub:Subscription;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.user.value) this.router.navigate(['/user']);
    this.errSub = this.userService.getErrorMessage().subscribe(err => this.err = err);
  }

  registerUser(email,password,username) {
    this.userService.registerUser(email.value,password.value,username.value);
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }
}
