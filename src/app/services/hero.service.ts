import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url:string = 'http://localhost:8080/hero/';
  

  constructor(private http:HttpClient, private userService:UserService) {}

  getHeroes(id:number):Observable<string>{
    return this.http.get(this.url+id,{withCredentials:true}) as Observable<string>
  }

  addHero(hero:Hero):Observable<Hero>{
    console.log(hero);
    return this.http.post(this.url,hero,{withCredentials:true}) as Observable<Hero>
  }

<<<<<<< HEAD
  getHeroById(id:number):Observable<any>{
      // fetch from api
      return this.http.get('https://akabab.github.io/superhero-api/api/id/'+id+'.json') as Observable<any>
      //return this.http.get('https://www.superheroapi.com/api.php/100277516057979/' + id) as Observable<any>
    
  }

  getHeroByName(name:string):Observable<any>{
    return this.http.get('https://www.superheroapi.com/api.php/100277516057979/search/' + name) as Observable<any>
  }

  
=======
  updateHero(hero:Hero):Observable<Hero>{
    console.log(hero);
    return this.http.put(this.url,hero,{withCredentials:true}) as Observable<Hero>
  }

// To verify, eventually no hero and any instead of
getHeroById(id:number):Observable<any>{
  return this.http.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/' + id +".json") as Observable<any>
}

logout(){
  this.userService.activeUser = null;
}
>>>>>>> 91cb44baa345755776cf06736380ffc951334b67
}
