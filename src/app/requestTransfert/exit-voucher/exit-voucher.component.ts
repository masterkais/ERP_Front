import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/shared/models/category.model';
import { ExitVoucher } from 'app/shared/models/exitVoucher.model';
import { LineRequestTransfert } from 'app/shared/models/lineRequestTransfert.model';
import { LineRequestTransfertDetail } from 'app/shared/models/lineRequestTransfertDetail.model';
import { Product } from 'app/shared/models/product.model';
import { RequestTransfert } from 'app/shared/models/requestTransfert.model';
import { User } from 'app/shared/models/user.module';
import { Vehicule } from 'app/shared/models/vehicule.model';
import { CategoryService } from 'app/shared/services/category.service';
import { ExitVoucherService } from 'app/shared/services/exitVoucher.service';
import { LineRequestTransfertService } from 'app/shared/services/lineRequestTransfert.service';
import { ProductService } from 'app/shared/services/product.service';
import { RequestTransfertService } from 'app/shared/services/requestransfert.service';
import { UserService } from 'app/shared/services/user.service';
import { VehiculeService } from 'app/shared/services/vehicule.service';
import jsPDF from 'jspdf';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'exit-voucher',
  templateUrl: './exit-voucher.component.html',
  styleUrls: ['./exit-voucher.component.css']
})
export class ExitVoucherComponent implements OnInit {
  loaded: Promise<boolean>;
 idRequest:number;
 requestTransfert:RequestTransfert;
 category:Category;
 product:number;
 transferLine:LineRequestTransfert;
 transfertLines:LineRequestTransfert[]=[];
 transerts:Array<{lt:LineRequestTransfert,ltds:LineRequestTransfertDetail[]}>=[]
 user:User;
 exitVoucher:ExitVoucher;
 idExitVoucher:number;
 drivers:User[];
 vehicules:Vehicule[]=[];
 typeSelected: string;
 total;
  constructor(private spinnerService: NgxSpinnerService,private lineDetailTransfertService:LineRequestTransfertService ,private vehiculeService:VehiculeService,private activatedRoute:ActivatedRoute,private requestTransfertService:RequestTransfertService,private userService:UserService,
    private productService:ProductService,private categoryService:CategoryService,private transfertLineServie:LineRequestTransfertService,
    private router:Router,private datePipe:DatePipe,private toast:NgToastService,private exitVoucherService:ExitVoucherService) {
    this.idRequest=this.activatedRoute.snapshot.params.id;
    this.typeSelected = 'ball-clip-rotate';
    this.showSpinner()
   }
 
  ngOnInit(): void {
this.getAll();
this.getTotal();
  }
  async getTotal() {
    await this.requestTransfertService.getTotalRequestById(this.idRequest).then((data)=>{
      this.total=data;
    })
  }
  async getAll(){
    await this.getRequestTransfert();
    await this.getExitVoucher();
    await this.getLinesTransfert();
    await this.getUser();
    await this.getDrivers();
    await this.getVehicules();
    await this.getTotal();
    this.loaded = Promise.resolve(true);
  }
  public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); // 5 seconds
  }
  async getVehicules() {
    this.requestTransfert.deliveryManIds.forEach(async (id)=>{
      await this.vehiculeService.getVehiculeByIdDriver(id).then((data)=>{
        this.vehicules.push(data)
      })
    })
  }
  async getDrivers() {
   await this.userService.getDriversByIdRequest(this.idRequest).then((data)=>{
      this.drivers=data;
    });

  }
  async getRequestTransfert() {
    await this.requestTransfertService.getRequestTransfertByIdWithPromise(this.idRequest).then((data)=>{
      this.requestTransfert=data;
    })
  }
  async getExitVoucher() {
    await this.exitVoucherService.getExitVoucherById(this.requestTransfert.exitVoucherId).then((data)=>{
      this.exitVoucher=data;
    })
  }
  async getLinesTransfert() {
        await this.getLT();
        await this.getAllLineDetails();
       await this.getAllProductByLinetransfert();
        }


async getAllProductByLinetransfert(){
  console.log("parcours :"+this.transerts.length)
 await this.transerts.forEach((transfert)=>{
    transfert.ltds.forEach(async (ltd)=>{
      this.getProductById(ltd.product)
    })
  });

}
  async getProductById(product: any) {
    await this.productService.getProductByIdV2(product).then((p)=>{
      product=p;
    })
  }
async  getAllLineDetails() {
  await this.transfertLines.forEach(async (data)=>{
    await this.lineDetailTransfertService.findAllTransfertLineDetaiByIdLineTransfert(data.id).then((ld)=>{
      let tld:any={lt:data,ltds:ld};
      this.transerts.push(tld);
    });});
}
async getLT() {
  await this.transfertLineServie.getAllLineRequestTransfertByIdRequestWithPromise(this.idRequest).then((data)=>{
    data.forEach((lt)=>{
      if(lt.state==3 || lt.state==4 || lt.state==5){this.transfertLines.push(lt)}
    });   });
}
 
  async getUser() {
    await this.userService.getUserByIdWithPromise(this.requestTransfert.inventaryManagerId).then((data)=>{
      this.user=data;
    })
   }
  @ViewChild('pdf', { static: false }) pdf: ElementRef;

  public downloadAsPDF() {
    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      
      '</style>';
    var printContents = document.getElementById('pdf').innerHTML;
    var popupWin = window.open(
      'Angular Large Table to pdf',
      '_blank',
    
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '</style>' +
        '</head><body onload="window.print();window.close()">' +
        printContents +
        '</body></html>'
    );
    popupWin.document.close();
  }
  async getCategoryById(id:number){
    let category:Category;
    await this.categoryService.getCategoryByIdV2(id).then((data)=>category=data)
    return category;
  }
  formaterDate(date) {
    if (date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
  }
    onRetourVersDemandes(){
      this.router.navigateByUrl("myRequestTransfert");
    }
}



