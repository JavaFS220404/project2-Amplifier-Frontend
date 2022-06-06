import { User } from "./user";

export class Hero {
    constructor(public id:number, public name:string, public intelligence:number, public strength:number, public speed:number, 
        public durability:number, public power:number, public combat:number, public isPublic?:boolean,public owner?:User,){}
}
