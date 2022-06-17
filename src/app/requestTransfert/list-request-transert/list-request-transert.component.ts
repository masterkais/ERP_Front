import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { DialogService } from "app/shared/services/dialog.service";
import { ProductService } from "app/shared/services/product.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "list-request-transert",
  templateUrl: "./list-request-transert.component.html",
  styleUrls: ["./list-request-transert.component.css"],
})
export class ListRequestTransertComponent implements OnInit {
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
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private toast: NgToastService,
    private siteStockService: SiteStockService,
    private productService: ProductService,
    private requestTransfertService: RequestTransfertService
  ) {}
  ngOnInit(): void {
    this.getAllRequestTransfert();
  }
  getAllRequestTransfert() {
    this.requestTransfertService.getAllRequestTransfert().subscribe((data) => {
      this.listRequestTransfert = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onEdit(request: RequestTransfert) {}
  onAccept(request: RequestTransfert) {}
  onDelete(request: RequestTransfert) {}
  onShowDetail(request: RequestTransfert) {}
}
