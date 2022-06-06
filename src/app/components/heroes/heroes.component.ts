import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  newCharacterName:string = '';
  newIntelligence:number = 0;
  newStrength:number = 0;
  newSpeed:number = 0;
  newDurability:number = 0;
  newPower:number = 0;
  newCombat:number = 0;
  newIsPublic:boolean = false;

  heroId:number = 0;
  heroName:string = '';
  favouriteHeros:Hero[]=[];

  constructor(private userService:UserService, private heroService:HeroService) { }


  ngOnInit(): void {

  }
 
  
  loadFavouriteHeroes():void{
    this.heroService.getHeroes().subscribe({
      next:(data:Hero[])=>{
        console.log(data);
        this.favouriteHeros = data;
      }
    })
  }

  createCharater(){
    console.log(this.newIsPublic);
    this.heroService.addHero(new Hero(0,this.newCharacterName,this.newIntelligence, this.newStrength,this.newSpeed,
                            this.newDurability,this.newPower,this.newCombat,this.newIsPublic)).subscribe({
      next:()=>{
        console.log("New character created.");
      },
      error:()=>{
        console.log("Couldn't create new character!");
      }
    
    })
  }


  getHeroById(){
    this.heroService.getHeroById(this.heroId).subscribe(
      {next:(hero:Hero)=>{
        console.log(hero);
      }
    })
  }   

  getHeroByName(){
    this.heroService.getHeroByName(this.heroName).subscribe(
      {next:(hero:Hero)=>{
        console.log(hero);
      }
    })
  }   

  /*
   here comes battle logic 
  */
}

