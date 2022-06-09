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
  hero:Hero | undefined;

  heroes:Hero[] = []; 
  battleHeroId1:number = 0;
  battleHeroId2:number = 0;

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

  /*
  loadHero(hero:Hero):void{
    this.heroService.getHeroes().subscribe({
      next:(data:Hero[])=>{
        console.log(data);
        this.favouriteHeros = data;
      }
    })
  }
*/

  createCharater(){
    console.log(this.newIsPublic);
    this.heroService.addHero(new Hero(0,this.newCharacterName,this.newIntelligence, this.newStrength,this.newSpeed,
                            this.newDurability,this.newPower,this.newCombat)).subscribe({
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


  heroBattle(){
    this.heroService.getHeroById(this.battleHeroId1).subscribe({
      next:(data:any)=>{
          let hero1:Hero = new Hero(this.battleHeroId1, data.name, data.powerstats.intelligence, data.powerstats.strength,
          data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat);
          this.heroService.getHeroById(this.battleHeroId2).subscribe({
            next:(data:any)=>{
                let hero2:Hero = new Hero(this.battleHeroId2, data.name, data.powerstats.intelligence, data.powerstats.strength,
                data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat);
                console.log(hero1);
                console.log(hero2);
                this.battlelogic(hero1,hero2);
            },
            error:()=>{
              console.log("The second Hero doesnt exist!");
            }
          }); 
      },
      error:()=>{
        console.log("The first Hero doesnt exist!");
      }
    });  
    

  }
  battlelogic(hero1:Hero, hero2:Hero){
    let counter:number = 0;
    if(hero1.intelligence > hero2.intelligence){
      counter++;
    } else if(hero1.intelligence < hero2.intelligence){
      counter--;
    }
    if(hero1.durability > hero2.durability){
      counter++;
    } else if(hero1.durability < hero2.durability){
      counter--;
    }
    if(hero1.power > hero2.power){
      counter++;
    } else if(hero1.power < hero2.power){
      counter--;
    }
    if(hero1.speed > hero2.speed){
      counter++;
    } else if(hero1.speed < hero2.speed){
      counter--;
    }
    if(hero1.combat > hero2.combat){
      counter++;
    } else if(hero1.combat < hero2.combat){
      counter--;
    }
    if(hero1.strength > hero2.strength){
      counter++;
    } else if(hero1.strength < hero2.strength){
      counter--;
    }
    if(counter > 0){
      console.log("Hero 1 wins!");
      // boolean to change appearance in the HTML
    } else if(counter < 0){
      console.log("Hero 2 wins!");
      // boolean to change appearance in the HTML 
    } else {
      console.log("Its a draw!");
      // boolean to change appearance in the HTML
    }   
  }
}

