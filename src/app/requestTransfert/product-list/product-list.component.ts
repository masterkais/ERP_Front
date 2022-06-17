import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/shared/models/product.model';
import { AuthentificationServiceService } from 'app/shared/services/authentification-service.service';
import { CaddyService } from 'app/shared/services/caddy.service';
import { CategoryService } from 'app/shared/services/category.service';
import { ProductService } from 'app/shared/services/product.service';
import { Router } from 'express';
import { data } from 'jquery';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title:string;
  currentRequest:string;
  qte:number;
 private currentTime: number=0;
products:Product[];
 constructor(
   public catService:CategoryService,
   private productService:ProductService,
   private caddyService:CaddyService,

  ) { }

 ngOnInit() {
  console.log("getALLLproduct")
   this.getAllProduct();
 }
  getAllProduct() {
    console.log("getALLLproduct")
    this.productService.getAllProduct().subscribe((data)=>{this.products=data})
  }

  onEditPhoto(p){

  }
  onProductDetails(p){
    
  }
  onAddProductToCaddy(p:Product) {
    console.log(p.quantity)
      this.caddyService.addProduct(p);
    
  }
}