import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { User } from "app/shared/models/user.module";
import { DialogService } from "app/shared/services/dialog.service";
import { EntryVoucherService } from "app/shared/services/entryVoucher.model";
import { ProductService } from "app/shared/services/product.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "employer-list-request-transfert",
  templateUrl: "./employer-list-request-transfert.component.html",
  styleUrls: ["./employer-list-request-transfert.component.css"],
})
export class EmployerListRequestTransfertComponent implements OnInit {
  data: any[] = [];
  displayedColumns: string[] = [
    "dateCreated",
    "dateAccpted",
    "numberPalette",
    "deliveryManIds",
    "state",
    "siteDestinaion",
    "siteSource",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<RequestTransfert>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listRequestTransfert: RequestTransfert[];
  siteSource;
  siteDestination;
  requestTransfertList: RequestTransfert[];
  user: User;
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
    this.getAllRequestTransfert();
  }
  async getAllRequestTransfert() {
    await this.userService
      .getCurrentUserWithPromise()
      .then((data) => (this.user = data));
    this.requestTransfertService.getAllRequestTransfert().subscribe((data) => {
      this.listRequestTransfert = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onEdit(request: RequestTransfert) {}
  async onSubmitRequestTransfert(request: RequestTransfert) {
    await this.requestTransfertService
      .submitRequestTransfert(request.id)
      .then((data) => {});
    this.toast.success({
      detail: "Demande transfert est envoyer avec succée !",
      duration: 5000,
    });
    this.getAllRequestTransfert();
    //window.location.reload();
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
}
