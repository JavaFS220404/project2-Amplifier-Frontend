import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "http://localhost:8083/user/";

  activeUser:User|null = null;

  constructor(private http:HttpClient) { }

  attemptLogin(user:User):Observable<User>{
    return (this.http.post(this.url, user, {withCredentials: true}) as Observable<User>)
  }

  registerUser(user:User):Observable<unknown>{
    return this.http.post(this.url+"register", user);
  }
}
