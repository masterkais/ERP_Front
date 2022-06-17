import { ItemProduct } from "./item-product.model";
import { User } from "./user.module";

export class Caddy{
  constructor(name:string){this.name=name;}
  public name:string;
  public items:Map<number,ItemProduct>=new Map();
  public client:User;
}