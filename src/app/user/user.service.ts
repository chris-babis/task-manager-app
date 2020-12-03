import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient, private router:Router) { }

  errorMessage = new Subject<string>();

  registerUser(email,password,username) {
    this.http.post(`http://localhost:3000/users`, {email,password,username})
    .pipe(tap(userData => this.handleAuth(userData)))
    .subscribe(
      res => this.router.navigate(['/user']),
      err => this.errorMessage.next(err.error.err)    
    )
  }

  loginUser(email,password) {
    this.http.post(`http://localhost:3000/users/login`, {email,password})
    .pipe(tap(userData => this.handleAuth(userData)))
    .subscribe(
      res => this.router.navigate(['/user']),
      err => this.errorMessage.next(err.error)
    )
  }

  logoutUser(){
    this.http.post(`http://localhost:3000/logout`, this.user.value
    ).subscribe(res => {
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    })
  }

  handleAuth(userData) {    
    const user = new User(userData.user._id,userData.token, userData.user.username);    
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin(){
    const userData: {_id: string; token: string; username: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;
    
    const loggedInUser = new User(userData._id,userData.token, userData.username);
    if(loggedInUser.token) this.user.next(loggedInUser);
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }

  getUser(){
    return this.user.asObservable();
  }


  
}
