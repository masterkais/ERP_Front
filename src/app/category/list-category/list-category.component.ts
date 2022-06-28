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
  selector: "list-category",
  templateUrl: "./list-category.component.html",
  styleUrls: ["./list-category.component.css"],
})
export class ListCategoryComponent implements OnInit {
  displayedColumns: string[] = ["name", "description","brand","Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Category>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categorys?: Category[] = [];
  category?: Category;
  search: any;
  selection: any[];
  ids: Category[] = [];
  brand:Brand;
  constructor(
    private categoryService: CategoryService,
    private brandService:BrandService,
    private router: Router,
    private dialogService: DialogService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((categorys) => {
      this.categorys = categorys;
      categorys.forEach((data)=>{
        this.brandService.getBrandById(data.idBrand).subscribe((res)=>{
          data.idBrand=res;
        })
      })
      this.dataSource = new MatTableDataSource(categorys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(categorys));
    });
  }
  getBrand(idBrand):string{
    this.brandService.getBrandById(idBrand).subscribe((data)=>{
      this.brand=data;
    })
    return this.brand.name;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(category: Category) {
    this.router.navigateByUrl("category/edit-category/" + category.id);
    this.toast.info({
      detail: "Vous pouvez effectuer vos modification!",
      duration: 5000,
    });
  }
  onDelete(category: Category) {
    this.dialogService
      .openConfirmDialog("<p>Vous etes sur ?</p>")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.categoryService.deleteCategoryById(category.id).subscribe(() => {
            this.getAllCategory();
            this.toast.success({
              detail: "Suppression category avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
}
