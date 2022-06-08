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
  hero1:Hero|undefined;
  hero2:Hero|undefined;

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


  heroBattle():Hero[]{
    this.heroService.getHeroById(this.battleHeroId1).subscribe({
      next:(data:any)=>{
          this.hero1 = new Hero(this.battleHeroId1, data.name, data.powerstats.intelligence, data.powerstats.strength,
          data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat);
          this.heroes.push(this.hero1);
      },
      error:()=>{
        console.log("The first Hero doesnt exist!");
      }
    });  
    this.heroService.getHeroById(this.battleHeroId2).subscribe({
      next:(data:any)=>{
          this.hero2 = new Hero(this.battleHeroId2, data.name, data.powerstats.intelligence, data.powerstats.strength,
          data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat);
          this.heroes.push(this.hero2);
      },
      error:()=>{
        console.log("The second Hero doesnt exist!");
      }
    }); 

    console.log(this.hero1);
    console.log(this.hero2);

    return this.heroes;

   /*
       let counter:number = 0;
    if(this.hero1.intelligence > this.hero2.intelligence){
      counter++;
      console.log(counter);
    } else if(this.hero1.intelligence < this.hero2.intelligence){
      counter--;
    }
    if(this.hero1.durability > this.hero2.durability){
      counter++;
    } else if(this.hero1.durability < this.hero2.durability){
      counter--;
    }
    if(this.hero1.power > this.hero2.power){
      counter++;
    } else if(this.hero1.power < this.hero2.power){
      counter--;
    }
    if(this.hero1.speed > this.hero2.speed){
      counter++;
    } else if(this.hero1.speed < this.hero2.speed){
      counter--;
    }
    if(this.hero1.combat > this.hero2.combat){
      counter++;
    } else if(this.hero1.combat < this.hero2.combat){
      counter--;
    }
    if(this.hero1.strength > this.hero2.strength){
      counter++;
    } else if(this.hero1.strength < this.hero2.strength){
      counter--;
    }

    console.log(counter);

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
   */

  }
}

