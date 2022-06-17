import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from 'app/shared/models/caddy.model';
import { ItemProduct } from 'app/shared/models/item-product.model';
import { AuthentificationServiceService } from 'app/shared/services/authentification-service.service';
import { CaddyService } from 'app/shared/services/caddy.service';
import { CategoryService } from 'app/shared/services/category.service';

@Component({
  selector: 'list-caddy',
  templateUrl: './list-caddy.component.html',
  styleUrls: ['./list-caddy.component.css']
})
export class ListCaddyComponent implements OnInit {

  public caddy:Caddy;

  constructor(private catService:CategoryService, private router:Router,
              public caddyService:CaddyService, private authService:AuthentificationServiceService) { }
  
  ngOnInit() {
    this.caddy=this.caddyService.getCaddy();
    console.log(this.caddy);
  }

  onRemoveProductFromCaddy(p: ItemProduct) {
    console.log('onRemoveProductFromCaddy(p: ItemProduct)')
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
      return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }



  
}