import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteStock } from 'app/shared/models/siteStock.model';
import { SiteStockService } from 'app/shared/services/siteStock.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'edit-site-stock',
  templateUrl: './edit-site-stock.component.html',
  styleUrls: ['./edit-site-stock.component.css']
})
export class EditSiteStockComponent implements OnInit {
  siteStockFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  siteStock: SiteStock;
  state:string=null;
  idSiteStock:number;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private siteStockService: SiteStockService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.idSiteStock=this.activatedRoot.snapshot.params.id;
  }

  ngOnInit(): void {
    this.siteStockService.getSiteStockById(this.idSiteStock).subscribe((data)=>{
      this.siteStock=data;
    })
    this.siteStockFormGroup = this.formBuilder.group({
      name: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      adress: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
     
      } else {
        console.log(event.source.value);
    
      }
    }
  }

  onUpdateSiteStock() {
    this.submitted = true;
    let state:boolean;
    if(this.state==="true"){
      state=true;
    }else {
    }
    let data: SiteStock = {
      id: this.idSiteStock,
      name: this.siteStockFormGroup.value.name,
      description: this.siteStockFormGroup.value.description,
      adress: this.siteStockFormGroup.value.adress,
      state: state,
    };
    this.siteStockService.editSiteStock(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/siteStock");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
