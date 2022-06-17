import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Basket } from "app/shared/models/basket.model";
import { ItemProduct } from "app/shared/models/item-product.model";
import { LineRequestTransfert } from "app/shared/models/lineRequestTransfert.model";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { User } from "app/shared/models/user.module";
import { AuthentificationServiceService } from "app/shared/services/authentification-service.service";
import { BasketService } from "app/shared/services/Basket.service";
import { LineRequestTransfertService } from "app/shared/services/lineRequestTransfert.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"],
})
export class BasketComponent implements OnInit {
  basket: Basket;
  requestTransfertFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  requestTransfert: RequestTransfert;
  siteStocks: SiteStock[];
  state;
  user: User;
  siteStockSource: SiteStock;
  siteStockDestination: SiteStock;
  constructor(
    private requestLineService:LineRequestTransfertService,
    private router: Router,
    public basketService: BasketService,
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestTransfertService: RequestTransfertService,
    private toast: NgToastService,
    private siteStockService: SiteStockService,
    private authService: AuthentificationServiceService,
  ) {}

  ngOnInit() {
    if (!this.authService.isLogged) this.router.navigateByUrl("/login");
    this.basket = this.basketService.getBasket();
    console.log(this.basket.name);
    this.authService.getCurrentUser().subscribe((data) => (this.user = data));
    this.siteStockService.getAllSiteStock().subscribe((data) => {
      this.siteStocks = data;
    });
    this.requestTransfertFormGroup = this.formBuilder.group({
      siteStockSource: ["", Validators.compose([Validators.required])],
      siteStockDestination: ["", Validators.compose([Validators.required])],
    });
  }

  onRemoveProductFromBasket(p: ItemProduct) {
    this.basketService.removeProduct(p.id);
  }

  getTotal() {
    return this.basketService.getTotalCurrentBasket();
  }

  async onNewOrder() {
    await this.onSaveRequestTransfert();
    for(let key in this.basket.items){
        let lineRequestTransfert:LineRequestTransfert={
          id:null,
          quantity:this.basket.items[key].quantity,
          requestTransfertId:this.requestTransfert.id,
          categoryid:this.basket.items[key].idCategory,
          state:0,
      }
     
      this.requestLineService.addLineToRequestTransfert(lineRequestTransfert).subscribe((req)=>{
        this.toast.success({ detail: "Il faut valider votre demande transfert !", duration: 4000 });
        this.router.navigateByUrl("/myRequestTransfert");
      },(err)=>{
        this.toast.error({ detail: "La quantité de produit est insuffisante  dans le stock !", duration: 4000 });
      }); 
    }
  }

  onAddBasket() {
    let size = this.basketService.listBaskets.length;
    let index: number = this.basketService.listBaskets[size - 1].num;
    this.basketService.addNewBasket({
      num: index + 1,
      name: "Basket" + (index + 1),
    });
  }

  onSelectBasket(c: { num: number; name: string }) {
    this.basketService.currentBasketName = c.name;
    this.basket = this.basketService.getBasket();
  }
  getSource(siteStock:SiteStock){
    this.siteStockSource=siteStock;
    console.log("this.siteStockSource="+this.siteStockSource.name);
   }
   getDestination(siteStock:SiteStock){
    this.siteStockDestination=siteStock;
    console.log("this.siteStockDestination="+this.siteStockDestination.name);
   }
  async onSaveRequestTransfert() {
    console.log(this.siteStockSource.name)
    console.log(this.siteStockDestination.name)
    let inventaryManagerId= this.user.id;
    let siteSource= this.siteStockSource.name;
    let siteDestinaion= this.siteStockDestination.name;
    await this.requestTransfertService.createNewEmptyRequestTransfert(inventaryManagerId,siteSource,siteDestinaion).then(
      (data) => {
        this.requestTransfert=data;
        console.log("*****************************************");
        this.toast.success({ detail: "Votre demande de transfert a etait créer !", duration: 5000 });
        this.router.navigateByUrl("/requestTransfert/category-requestTransfert");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
