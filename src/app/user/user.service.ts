import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  errorMessage = new Subject<string>();

  registerUser(email,password) {
    this.http.post(`http://localhost:3000/users`, {email,password})
    .subscribe(
      res => console.log(res),
      err => this.errorMessage.next(err.error.err)    
    )
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }
}
