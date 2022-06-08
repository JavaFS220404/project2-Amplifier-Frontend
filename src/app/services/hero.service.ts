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
    console.log(hero);
    return this.http.post(this.url,hero,{withCredentials:true}) as Observable<Hero>
  }

// To verify, eventually no hero and any instead of
  getHeroById(id:number):Observable<any>{
    return this.http.get('https://www.superheroapi.com/api.php/100277516057979/' + id) as Observable<any>
  }

  // To verify, eventually no hero and any instead of
  getHeroByName(name:string):Observable<any>{
    return this.http.get('https://www.superheroapi.com/api.php/100277516057979/search/' + name) as Observable<any>
  }

  
}
