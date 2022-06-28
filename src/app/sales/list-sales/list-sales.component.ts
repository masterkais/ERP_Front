

  import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { lineSales } from "app/shared/models/lineSale.model";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { sale } from "app/shared/models/sale.model";
import { User } from "app/shared/models/user.module";
import { DialogService } from "app/shared/services/dialog.service";
import { EntryVoucherService } from "app/shared/services/entryVoucher.model";
import { ProductService } from "app/shared/services/product.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {
  data: any[] = [];
  displayedColumns: string[] = [
    "dateCreated",
    "dateAccpted",
    "numberPalette",
    "purchasingManager",
    "state",
    "client",
    "totalSale",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<sale>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sale: sale[];
  siteSource;
  siteDestination;
  saleList: sale[];
  user: User;
  client:User;
  commercial:User;
  line:lineSales[]=[];
  total;
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private toast: NgToastService,
    private siteStockService: SiteStockService,
    private productService: ProductService,
    private requestTransfertService: RequestTransfertService,
    private userService: UserService,
    private entryVoucherService: EntryVoucherService
  ) {}
  ngOnInit(): void {
    this.getAllSales();
  }
  async getAllSales() {
    
    this.requestTransfertService.getAllSales().then((data) => {
      this.saleList=data;
      this.saleList.forEach(async (d)=>{
        await this.saleList.forEach(async (d)=>{
          await this.userService.getUserByIdV2(d.clientId).then((data)=>{
            d.clientId=data;
            console.log("d.clientId -"+d.clientId)
          });
          await this.requestTransfertService.getAllLineSales(d.id).then((k)=>{
        
            this.total=k.quantity*d.totalSale;
            console.log("*****"+this.total);
            console.log("*****"+k.quantity);
            console.log("*****"+d.totalSale);
          })
        
         await this.userService.getUserByIdV2(d.purchasingManagerId).then((data)=>{
            d.purchasingManagerId=data;
            console.log("d.purchasingManagerId -"+JSON.stringify(d.purchasingManagerId))
          });
        });
      })
      this.dataSource = new MatTableDataSource(this.saleList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  
  }
  
  onDelete(request: RequestTransfert) {}
  onShowLineTransfert(request: RequestTransfert) {
    this.router.navigateByUrl("/requestTransfertLines/" + request.id);
  }
  onDeliverOrder(request: RequestTransfert) {
    this.router.navigateByUrl("/requestTransfert/deliverOrder/" + request.id);
  }
  onExitVoucher(req: RequestTransfert) {
    this.router.navigateByUrl("/requestTransfert/exitVoucher/" + req.id);
  }
  onAcceptLivraison(req: RequestTransfert) {
    this.entryVoucherService.onNewEntryVoucher(req.id).then(() => {
      this.toast.success({
        detail: "Le Bon d'entrée a etait créer avec succée !",
      });
    });
    this.router.navigateByUrl("/requestTransfertLinesEntry/" + req.id);
  }
  onShowEntryVoucher(req: RequestTransfert) {
    this.router.navigateByUrl("/requestTransfert/entryVoucher/" + req.id);
  }
  formaterDate(date){
    if(date){
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear();
      let min=d.getMinutes();
      let h=d.getHours();
   
       if (month.length < 2) 
           month = '0' + month;
       if (day.length < 2) 
           day = '0' + day;
   
       return [year, month, day,h,min].join('-');
    }
  }
}
