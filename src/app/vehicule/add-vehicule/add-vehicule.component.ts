import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ActivatedRoute, Router } from "@angular/router";
import { SiteStock } from "app/shared/models/siteStock.model";
import { Vehicule } from "app/shared/models/vehicule.model";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { VehiculeService } from "app/shared/services/vehicule.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent implements OnInit {

  VehiculeFormGroup?: FormGroup;
  submitted: boolean = false;
  vehicules = new FormControl();
  vehicule:Vehicule;
  state;
  dat:Date;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vehiculeService:VehiculeService,
    private toast: NgToastService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}


  ngOnInit(): void {
    this.VehiculeFormGroup = this.formBuilder.group({
      lable: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      serialNumber: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      datePurchase: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  radioChange(event: MatRadioChange) {
    this.state=event.value;
    console.log(event.value);
  }

  onSaveVehicule() {
    this.submitted = true;
    let state:boolean;
    if(this.state==1){
      state=true;
    }else {
      state=false;
    }
    const myDate = this.VehiculeFormGroup.value.datePurchase;
    var maDate = this.datePipe.transform(myDate, "yyyy-MM-ddT14:20:29");
    let data: Vehicule = {
      id: null,
      lable: this.VehiculeFormGroup.value.lable,
      datePurchase: maDate,
      serialNumber: this.VehiculeFormGroup.value.serialNumber,
      state: state,
      deliveryManId:null
    };
    this.vehiculeService.saveVehicule(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/vehicule");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}


 