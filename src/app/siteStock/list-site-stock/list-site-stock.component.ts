import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SiteStock } from 'app/shared/models/siteStock.model';
import { DialogService } from 'app/shared/services/dialog.service';
import { SiteStockService } from 'app/shared/services/siteStock.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'list-site-stock',
  templateUrl: './list-site-stock.component.html',
  styleUrls: ['./list-site-stock.component.css']
})
export class ListSiteStockComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "description",
    "adress",
    "state",
    "Action",
  
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<SiteStock>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  siteStocks?: SiteStock[] = [];
  sieSock?: SiteStock;
  search: any;
  selection: any[];
  ids: SiteStock[] = [];
  constructor(
    private serviceSiteStock:SiteStockService,
    private router: Router,
    private dialogService: DialogService,
    private toast: NgToastService,
  ) {
  }
  ngOnInit(): void {
    this.getAllSiteStock();
  }
  getAllSiteStock() {
    this.serviceSiteStock.getAllSiteStock().subscribe((siteSocks) => {
      this.siteStocks = siteSocks;
      this.dataSource = new MatTableDataSource(siteSocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(siteSock:SiteStock) {
    this.router.navigateByUrl("siteStock/edit-siteStock/" + siteSock.id);
    this.toast.info({
      detail: "Vous pouvez modifier le site de stock!",
      duration: 5000,
    });
  }
  onDelete(siteSock:SiteStock) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviceSiteStock.deleteSiteStockById(siteSock.id).subscribe(() => {
            this.getAllSiteStock();
            this.toast.success({
              detail: "Suppression siteStock avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  onActive(siteStock:SiteStock) {
        siteStock.state = true;
        this.serviceSiteStock.editSiteStock(siteStock).subscribe((res) => {
          this.toast.success({
            detail: "Site stock est en mode active !",
            duration: 5000,
          });
          this.getAllSiteStock();
        });
  }
  onDesactive(siteStock:SiteStock) {
    siteStock.state = false;
    this.serviceSiteStock.editSiteStock(siteStock).subscribe((res) => {
      this.toast.success({
        detail: "Site stock est inactive !",
        duration: 5000,
      });
      this.getAllSiteStock();
    });
  }
  
  }
  