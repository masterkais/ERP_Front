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
import { SiteStockService } from "app/shared/services/siteStock.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "add-site-stock",
  templateUrl: "./add-site-stock.component.html",
  styleUrls: ["./add-site-stock.component.css"],
})
export class AddSiteStockComponent implements OnInit {
  siteStockFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  siteStock: SiteStock;
  state;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private siteStockService: SiteStockService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.siteStockFormGroup = this.formBuilder.group({
      name: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      adress: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  radioChange(event: MatRadioChange) {
    this.state=event.value;
    console.log(event.value);
  }

  onSaveSiteStock() {
    this.submitted = true;
    console.log("*****************"+this.state);
    let state:boolean;
    
    if(this.state==1){
      state=true;
    }else {
      state=false;
    }
    let data: SiteStock = {
      id: null,
      name: this.siteStockFormGroup.value.name,
      description: this.siteStockFormGroup.value.description,
      adress: this.siteStockFormGroup.value.adress,
      state: state,
    };
    this.siteStockService.saveSiteStock(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/siteStock");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
