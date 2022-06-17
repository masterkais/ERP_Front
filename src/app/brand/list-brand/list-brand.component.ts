import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Brand } from "app/shared/models/brand.model";
import { Category } from "app/shared/models/category.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { BrandService } from "app/shared/services/brand.service";
import { CategoryService } from "app/shared/services/category.service";
import { DialogService } from "app/shared/services/dialog.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {
  displayedColumns: string[] = ["name", "description","Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Brand>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  brands?: Brand[] = [];
  brand?: Brand;
  search: any;
  selection: any[];
  ids: Brand[] = [];
  constructor(
    private brandService:BrandService,
    private router: Router,
    private dialogService: DialogService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getAllBrand();
  }
  getAllBrand() {
    this.brandService.getAllBrand().subscribe((brands) => {
      this.brands = brands;
      this.dataSource = new MatTableDataSource(brands);
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
  onEdit(brand:Brand) {
    this.router.navigateByUrl("brand/edit-brand/" + brand.id);
    this.toast.info({
      detail: "Vous pouvez effectuer vos modifications!",
      duration: 5000,
    });
  }
  onDelete(brand:Brand) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.brandService.deleteBrandById(brand.id).subscribe(() => {
            this.getAllBrand()
            this.toast.success({
              detail: "Suppression brand avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
}
