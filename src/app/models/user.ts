import { Hero } from "./hero";

export class User {

    constructor(public id:number, public username:string, public password:string, public firstName?:string,
        public lastName?:string, public eMail?:string, public heroes?:Hero[]){}
}
