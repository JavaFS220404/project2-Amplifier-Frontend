import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url:string = 'http://localhost:8080/hero/';

  constructor(private http:HttpClient) {}

  getHeroes():Observable<Hero[]>{
    return this.http.get(this.url,{withCredentials:true}) as Observable<Hero[]>
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post(this.url,hero,{withCredentials:true}) as Observable<Hero>
  }
// To verify, eventually no hero and any instead of
  getHero(hero:Hero, id:number):Observable<Hero>{
    return this.http.get('http://localhost:8080/hero/' + id) as Observable<Hero>
  }
}
