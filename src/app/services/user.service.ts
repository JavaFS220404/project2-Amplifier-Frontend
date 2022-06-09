import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "http://localhost:8080/user/";

  activeUser:User|null = null;

  constructor(private http:HttpClient) { }

  attemptLogin(user:User):Observable<User>{
    return (this.http.post(this.url, user, {withCredentials: true}) as Observable<User>)
  }

  registerUser(user:User):Observable<unknown>{
    return this.http.post(this.url+"register", user);
  }

  updateFavouriteList(id:number,heroid:number):Observable<User>{
    return this.http.patch(this.url+id,heroid,{withCredentials: true}) as Observable<User>;
  }

  
  getFavouriteList(id:number):Observable<any>{
    return this.http.get(this.url+id) as Observable<any>
  }
}
