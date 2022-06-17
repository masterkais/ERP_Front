import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from 'app/shared/models/caddy.model';
import { ItemProduct } from 'app/shared/models/item-product.model';
import { AuthentificationServiceService } from 'app/shared/services/authentification-service.service';
import { CaddyService } from 'app/shared/services/caddy.service';
import { CategoryService } from 'app/shared/services/category.service';

@Component({
  selector: 'caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {
  public caddy:Caddy;

  constructor(private router:Router,
              public caddyService:CaddyService, private authService:AuthentificationServiceService) { }
  
  ngOnInit() {
    if(!this.authService.isLogged)
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCaddy();
    console.log(this.caddy);
  }



  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
      return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
  }
}
