import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Brand } from "app/shared/models/brand.model";
import { Category } from "app/shared/models/category.model";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { User } from "app/shared/models/user.module";
import { Vehicule } from "app/shared/models/vehicule.model";
import { BrandService } from "app/shared/services/brand.service";
import { CategoryService } from "app/shared/services/category.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { UserService } from "app/shared/services/user.service";
import { VehiculeService } from "app/shared/services/vehicule.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'deliver-order-request-transfert',
  templateUrl: './deliver-order-request-transfert.component.html',
  styleUrls: ['./deliver-order-request-transfert.component.css']
})
export class DeliverOrderRequestTransfertComponent implements OnInit {
  deliverFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  state;
  vehicules:Vehicule[]=[];
  deliverMans:User[]=[];
  idsVehicules:any[]=[];idsDeliverMans:any[]=[];
  idRequest:number;
  request:RequestTransfert;
  
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private vehiculeService:VehiculeService,
    private requestService:RequestTransfertService,
    private userService:UserService,
    private activatedRout:ActivatedRoute,
  ) {
    this.idRequest=this.activatedRoot.snapshot.params.id;
  }

  ngOnInit(): void {
    this.requestService.getRequestTransfertById(this.idRequest).subscribe((data)=>this.request=data)
    this.vehiculeService.getAllVehicule().subscribe((data)=>{
      data.forEach((v)=>{
        if (v.state==false){
          this.vehicules.push(v);
        }
      })
    })
    this.userService.getAllUserNoActive().subscribe((data)=>{
      this.deliverMans=data;
    })
    this.deliverFormGroup = this.formBuilder.group({
      deliverMans: ["", Validators.compose([Validators.required])],
      vehicules: ["", Validators.compose([Validators.required])],
    });
  }
  compareFnDeliver(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getValuesDeliver(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.idsDeliverMans.push({ id: event.source.value.id});
      } else {
        console.log(event.source.value);
        this.removeDeliver(event.source.value);
      }
    }
  }
  removeDeliver(deliver): void { 
    this.idsDeliverMans= this.idsDeliverMans.filter(({ id }) => id !== deliver.id);        
  }
  compareFnVehicule(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getValuesVehicule(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.idsVehicules.push({ id: event.source.value.id});
      } else {
        console.log(event.source.value);
        this.removeVehicule(event.source.value);
      }
    }
  }
  removeVehicule(vehicule): void { 
    this.idsVehicules= this.idsVehicules.filter(({ id }) => id !== vehicule.id);        
  }
  async onDeliverOrder() {
   await this.deliver();
   this.toast.success({detail:"Votre commande a etait livrer",duration:5000});
   console.log("********/requestTransfert/exitVoucher/"+this.idRequest)
   this.router.navigateByUrl("/requestTransfert/exitVoucher/"+this.idRequest);
  }
  async deliver() {
    this.submitted=true;
    let idsD:number[]=[];
    let idsV:number[]=[];
    this.idsDeliverMans.forEach((data)=>{
     idsD.push(data.id);
    });
    this.idsVehicules.forEach((data)=>{
      idsV.push(data.id);
     });
  await this.requestService.deliverOrder(this.idRequest,idsD,idsV).then((data)=>{
    console.log("encours ....")
   })
  }
  onRetourVersLigneTransfert(){
    this.router.navigateByUrl("/requestTransfertLines/"+this.idRequest)
  }
}
