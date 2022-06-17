import { Injectable } from "@angular/core";
import { Basket } from "../models/basket.model";
import { ItemProduct } from "../models/item-product.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.module";
import { AuthentificationServiceService } from "./authentification-service.service";

@Injectable({
  providedIn: 'root'
})
export  class BasketService{
  public currentBasketName:string="Basket1";
  public listBaskets:Array<{num:number,name:string}>=[{num:1,name:'Basket1'}];
  public Baskets:Map<string,Basket>=new Map();
  constructor(private authService:AuthentificationServiceService){
    if(this.authService.isLogged) {
      this.loadBasketFromLocalStorage();
    }
    else{
      this.Baskets[this.currentBasketName]=new Basket(this.currentBasketName);
  }
 }

 public addProductToBasket(id:number,name:string,price:number,quantity:number,idCategory:number):void{
    let Basket=this.Baskets[this.currentBasketName];
    let item=Basket.items[id];
   if(item===undefined) {
     item=new ItemProduct();
     item.id=id;
     item.name=name;
     item.price=price;
     item.quantity=quantity;
     item.idCategory=idCategory;
     Basket.items[id]=item;
   }
   else{
     item.quantity+=quantity;
   }
 }
 public removeProduct(id:number):void{
   let Basket=this.Baskets[this.currentBasketName];
  delete Basket.items[id];
  this.saveBasket();
 }
 public addProduct(product:Product){
   this.addProductToBasket(product.id,product.name,product.sellingPrice,product.quantity,product.categoryId)
   this.saveBasket();
 }
 public loadBasketFromLocalStorage(){
      let myBasketsList=localStorage.getItem("ListBaskets_"+this.authService.getToken);
      this.listBaskets=myBasketsList==undefined?[{num:1,name:'Basket1'}]:JSON.parse(myBasketsList);
      this.listBaskets.forEach(c=>{
        let cad=localStorage.getItem("myBasket_"+this.authService.getToken+"_"+c.name);
        this.Baskets[c.name]=cad==undefined?new Basket(c.name):JSON.parse(cad);
      })
 }
 public getBasket():Basket{
   let Basket=this.Baskets[this.currentBasketName];
   return Basket;
 }

 saveBasket() {
   let Basket=this.Baskets[this.currentBasketName];
   localStorage.setItem("myBasket_"+this.authService.getToken+"_"+this.currentBasketName,JSON.stringify(Basket));
 }

 getSize(){
   let Basket=this.Baskets[this.currentBasketName];
   return Object.keys(Basket.items).length;
 }

 emptyBasket(){
   this.Baskets=new Map();
   this.listBaskets=[];
 }

 getTotalCurrentBasket() {
   let Basket=this.Baskets[this.currentBasketName];
   let total=0;
   for(let key in Basket.items ){
     total+=Basket.items[key].price*Basket.items[key].quantity;
   }
   return total;
 }

 addNewBasket(c: { num: number; name: string }) {
   this.listBaskets.push(c);
   this.Baskets[c.name]=new Basket(c.name);
   localStorage.setItem("ListBaskets_"+this.authService.getToken,JSON.stringify(this.listBaskets));
 }

 setClient(client: User) {
   this.getBasket().client=client;
   this.saveBasket();
 }
}
