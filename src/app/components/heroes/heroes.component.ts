import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { User } from 'src/app/models/user';
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  userid:number = (this.userService.activeUser)?this.userService.activeUser.id:0;
 
  newCharacterName:string = '';
  newIntelligence:number = 0;
  newStrength:number = 0;
  newSpeed:number = 0;
  newDurability:number = 0;
  newPower:number = 0;
  newCombat:number = 0;
  total:number=0;
  validationMessage:string='';

  heroId:number = 0;
  heroName:string = '';
  hero:Hero | undefined;
  favHeros:Hero[] = [];

  battleHeroId1:number = 0;
  battleHeroId2:number = 0;

  constructor(private userService:UserService, private heroService:HeroService) { }


  ngOnInit(): void {

  }
  
  
  viewFavourites():void{
    this.userService.getFavouriteList(this.userid).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.loadFavourites(data.favouriteCharacters)
      }
    })
  }


  loadFavourites(list:string):void{
    let heroIds:string[] = list.split(",");
    let counter:number = 0;
    for (let id of heroIds){
      let heroid:number = parseInt(id);
     this.heroService.getHeroById(heroid).subscribe({
      next:(data:any)=>{
        let hero = new Hero(this.heroId, data.name, data.powerstats.intelligence, data.powerstats.strength,
        data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat,data.images.sm);
        this.favHeros[counter] = hero;
        counter++;
        console.log(this.favHeros.length)
      },
      error:()=>{
          console.log("Hero doesn't exist!");
        }
      })
    }
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

    this.validationMessage='';

    if (this.newCharacterName.length == 0){
      this.validationMessage="Please input Character Name"; 
      document.getElementById("characterName")?.focus();
    }else if(this.newIntelligence < 1 || this.newIntelligence > 100 ){
        this.validationMessage="Intelligence must be between 1 and 100";
        document.getElementById("intelligence")?.focus();
    }else if(this.newStrength < 1 || this.newStrength > 100 ){
      this.validationMessage="Strength must be between 1 and 100";
      document.getElementById("strength")?.focus();
    }else if(this.newSpeed < 1 || this.newSpeed > 100 ){
      this.validationMessage="Speed must be between 1 and 100";
      document.getElementById("speed")?.focus();
    }else if(this.newDurability < 1 || this.newDurability > 100 ){
        this.validationMessage="Durability must be between 1 and 100";
        document.getElementById("durability")?.focus();
    }else if(this.newPower < 1 || this.newPower > 100 ){
      this.validationMessage="Power must be between 1 and 100";
      document.getElementById("power")?.focus();
    }else if(this.newCombat < 1 || this.newCombat > 100 ){
      this.validationMessage="Combat must be between 1 and 100";
      document.getElementById("combat")?.focus();
    }else{

      this.total = this.newIntelligence+this.newStrength+this.newSpeed+this.newDurability+this.newPower+this.newCombat;
      if (this.total > 360){
        this.validationMessage="Total Powerstats should be less than or equal to 360";
        document.getElementById("intelligence")?.focus();
      }else{

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
    }
  }


  getHeroById(){

    this.heroService.getHeroById(this.heroId).subscribe({
    next:(data:any)=>{
      this.hero = new Hero(this.heroId, data.name, data.powerstats.intelligence, data.powerstats.strength,
      data.powerstats.speed,data.powerstats.durability,data.powerstats.power,data.powerstats.combat,data.images.sm);
    },
    error:()=>{
        console.log("Hero doesn't exist!");
      }
    })
  }   


  addFavourite(){
      this.userService.updateFavouriteList(this.userid,this.heroId).subscribe({
        next:()=>{
          console.log("Added to favourites");
        },
        error:()=>{
          console.log("Couldn't add to favourites"); 
        }
      });
    
  }

 /* getHeroByName(){
    this.heroService.getHeroByName(this.heroName).subscribe(
      {next:(hero:Hero)=>{
        console.log(hero);
      }
    })
  } */  


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

