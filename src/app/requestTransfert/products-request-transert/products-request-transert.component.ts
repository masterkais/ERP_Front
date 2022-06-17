import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { Group } from "app/shared/models/group.model";
import { Product } from "app/shared/models/product.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { User } from "app/shared/models/user.module";
import { CategoryService } from "app/shared/services/category.service";
import { DialogService } from "app/shared/services/dialog.service";
import { GroupService } from "app/shared/services/group.service";
import { ImageService } from "app/shared/services/image.service";
import { ProductService } from "app/shared/services/product.service";
import { RowMaterialService } from "app/shared/services/rowMaterial.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
} from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
@Component({
  selector: 'products-request-transert',
  templateUrl: './products-request-transert.component.html',
  styleUrls: ['./products-request-transert.component.css']
})
export class ProductsRequestTransertComponent implements OnInit {
  data: any[] = [];
  items: GalleryItem[];
  displayedColumns: string[] = [
    "name",
    "description",
    "sellingPrice",
    "buyingPrice",
    "state",
    "active",
    "categoryId",
    "siteStockId",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Product>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listProducts: Product[];
  listSiteStock: SiteStock[];
  listCategory: Category[];
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private groupService: GroupService,
    private toast: NgToastService,
    private siteStockService: SiteStockService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private rowMaterialService: RowMaterialService,
    private productService: ProductService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {}
  ngOnInit(): void {
    this.getAllCategorys();
    this.getAllSiteStock();
    this.getAllProducts();
  }
  getAllSiteStock() {
    this.siteStockService
      .getAllSiteStock()
      .subscribe((data) => (this.listSiteStock = data));
  }
  getAllCategorys() {
    this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.listCategory = data));
  }
  getAllProducts() {
    this.productService.getAllProduct().subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.categoryId)
          .subscribe((category) => {
            data.categoryId = category;
            console.log("111")
          });
        this.siteStockService
          .getSiteStockById(data.siteStockId)
          .subscribe((siteSock) => {
            data.siteStockId = siteSock;
            console.log("2222")
          });
      
       //laa
      });
      //laa
     
      this.dataSource = new MatTableDataSource(products);
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
  onEdit(product: Product) {
    this.router.navigateByUrl("/product/edit-product/" + product.id);
  }
  onDelete(product: Product) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.productService.deleteProductById(product.id).subscribe(() => {
            this.getAllProducts();
            this.toast.success({
              detail: "Suppression product avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  async onShowImage(product: Product) {
    await this.recupererImgs(product);
    this.loadImages();
  }
  async recupererImgs(product: Product) {
    this.data=[];
    product.imagesIds.forEach((id)=>{
      this.imageService.getImageById(id).subscribe((img) => {
        let itm = { srcUrl: img.data };
        this.data.push(itm);
      });
    })
     
  
   
  }
  loadImages() {
    setTimeout((
    )=>{
    this.items = this.data.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.srcUrl })
      
    );
    const lightboxRef = this.gallery.ref("lightbox");
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });
    lightboxRef.load(this.items);
    
    this.lightbox.open(0)

    },1000)
      }
  onPromo(product: Product) {
    product.state = true;
    product.categoryId = product.categoryId.id;
    product.siteStockId = product.siteStockId.id;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit  est en promotion !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }

  onNotPromo(product: Product) {
    product.state = false;
    product.categoryId = product.categoryId.id;
    product.siteStockId = product.siteStockId.id;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit sort du promotion !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  onDispo(product: Product) {
    product.categoryId = product.categoryId.id;
    product.siteStockId = product.siteStockId.id;
    product.active = true;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit est disponible ! !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  onNotDispo(product: Product) {
    product.categoryId = product.categoryId.id;
    product.siteStockId = product.siteStockId.id;
    product.active = false;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit n'est pas disponible ! !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  applyFilterSiteStock(site: SiteStock) {
    this.productService.getAllProductBySiteStock(site.id).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilterCategory(category: Category) {
    this.productService
      .getAllProductByCategory(category.id)
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getAllProductDiponible() {
    this.productService.getAllProductByActive(true).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.categoryId)
          .subscribe((category) => {
            data.categoryId = category;
          });
        this.siteStockService
          .getSiteStockById(data.siteStockId)
          .subscribe((siteSock) => {
            data.siteStockId = siteSock;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductNonDisponible() {
    this.productService.getAllProductByActive(false).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.categoryId)
          .subscribe((category) => {
            data.categoryId = category;
          });
        this.siteStockService
          .getSiteStockById(data.siteStockId)
          .subscribe((siteSock) => {
            data.siteStockId = siteSock;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductPromotion() {
    this.productService.getAllProductByState(true).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.categoryId)
          .subscribe((category) => {
            data.categoryId = category;
          });
        this.siteStockService
          .getSiteStockById(data.siteStockId)
          .subscribe((siteSock) => {
            data.siteStockId = siteSock;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductNonPromotion() {
    this.productService.getAllProductByState(false).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.categoryId)
          .subscribe((category) => {
            data.categoryId = category;
          });
        this.siteStockService
          .getSiteStockById(data.siteStockId)
          .subscribe((siteSock) => {
            data.siteStockId = siteSock;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
