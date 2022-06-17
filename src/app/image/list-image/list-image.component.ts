import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { Image } from "app/shared/models/image.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { CategoryService } from "app/shared/services/category.service";
import { DialogService } from "app/shared/services/dialog.service";
import { ImageService } from "app/shared/services/image.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {
  displayedColumns: string[] = ["path","Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Image>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  images?: Image[] = [];
  image?: Image;
  search: any;
  selection: any[];
  ids: Image[] = [];
  constructor(
    private imageService:ImageService,
    private router: Router,
    private dialogService: DialogService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getAllImage();
  }
  getAllImage() {
    this.imageService.getAllImage().subscribe((images) => {
      this.images = images;
      this.dataSource = new MatTableDataSource(images);
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

  onDelete(image:Image) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.imageService.deleteImageById(image.id).subscribe(() => {
            this.getAllImage();
            this.toast.success({
              detail: "Suppression image avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
}
