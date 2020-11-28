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

  private user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient, private router:Router) { }

  errorMessage = new Subject<string>();

  registerUser(email,password) {
    this.http.post(`http://localhost:3000/users`, {email,password})
    .pipe(tap(userData => this.handleAuth(userData)))
    .subscribe(
      res => this.router.navigate(['/overview']),
      err => this.errorMessage.next(err.error.err)    
    )
  }

  loginUser(email,password) {
    this.http.post(`http://localhost:3000/users/login`, {email,password})
    .pipe(tap(userData => this.handleAuth(userData)))
    .subscribe(
      res => this.router.navigate(['/overview']),
      err => this.errorMessage.next(err.error)
      
    )
  }

  handleAuth(userData) {
    const user = new User(userData.user._id,userData.token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin(){
    const userData: {_id: string; token: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;

    const loggedInUser = new User(userData._id,userData.token);
    if(loggedInUser.token) this.user.next(loggedInUser);
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }


  
}
