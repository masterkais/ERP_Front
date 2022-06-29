
  import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
  import { MatPaginator } from "@angular/material/paginator";
  import { MatSort } from "@angular/material/sort";
  import { MatTableDataSource } from "@angular/material/table";
  import { Router } from "@angular/router";
  import { Brand } from "app/shared/models/brand.model";
  import { Category } from "app/shared/models/category.model";
import { Product } from "app/shared/models/product.model";
  import { SiteStock } from "app/shared/models/siteStock.model";
import { BasketService } from "app/shared/services/Basket.service";
  import { BrandService } from "app/shared/services/brand.service";
  import { CategoryService } from "app/shared/services/category.service";
  import { DialogService } from "app/shared/services/dialog.service";
import { ProductService } from "app/shared/services/product.service";
  import { SiteStockService } from "app/shared/services/siteStock.service";
import { rejects } from "assert";
  import { NgToastService } from "ng-angular-popup";
import { resolve } from "path";
import { DialogQuantityRequestTransertComponent } from "../dialog-quantity-request-transert/dialog-quantity-request-transert.component";
  
  @Component({
    selector: 'categoryss-request-transert',
    templateUrl: './categoryss-request-transert.component.html',
    styleUrls: ['./categoryss-request-transert.component.css']
  })
  export class CategoryssRequestTransertComponent implements OnInit{
    basketFormGroup?: FormGroup;
    groups = new FormControl();
  submitted: boolean = false;
    displayedColumns: string[] = ["name", "description","brand","Action"];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    dataSource!: MatTableDataSource<Category>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    categorys?: Category[] = [];
    category?: Category;
    search: any;
    selection: any[];
    ids: Category[] = [];
    idCategory;
    brand:Brand;
    products:any[];
    product:Product;
    productByCat;
    show=false;
    constructor(
      public dialog: MatDialog,
      private categoryService: CategoryService,
      private brandService:BrandService,
      private router: Router,
      private dialogService: DialogService,
      private toast: NgToastService,
      private formBuilder: FormBuilder,
      private basketService:BasketService,
      private productService:ProductService,
    ) {}
    ngOnInit(): void {
      this.getAllCategory();
      this.getAllProductDispo();
      this.basketFormGroup = this.formBuilder.group({
        quantity: [
          "",
          Validators.compose([Validators.required]),
        ],
      });
    }
   
    getAllCategory() {
      this.categoryService.getAllCategoryDipo().subscribe((categorys) => {
        this.categorys = categorys;
        categorys.forEach((data)=>{
          this.brandService.getBrandById(data.idBrand).subscribe((res)=>{
            data.idBrand=res;
          })
        })
        this.dataSource = new MatTableDataSource(categorys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        .openConfirmDialog("Vous etes sur ?")
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
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogQuantityRequestTransertComponent, {
        width: '250px',
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
      });
    }
    async getProdsByCategory(id:number){
      await this.productService.getAllProductByCategoryPromise(id).then((data)=>{
this.productByCat=data;
      })
    }
    async onAddToBasket(){
      this.submitted = true;
     await this.getProdsByCategory(this.category.id);
     
let product:Product={
  id: this.productByCat[0].id,
  name: this.productByCat[0].name,
  description: null,
  sellingPrice: this.productByCat[0].sellingPrice,
  buyingPrice:null,
  state: null,
  active: null,
  imagesIds: null,
  categoryId: this.idCategory,
  siteStockId: null,
  quantity:this.basketFormGroup.value.quantity
}
      this.basketService.addProduct(product);
      this.toast.success({ detail: "Ajout dans le basket avec succée !", duration: 3000 });
      this.router.navigateByUrl("/requestTransfert/category-requestTransfert");
        
    }
  
    onClick(cat:Category)
    {   
        this.category=cat;
        this.idCategory = cat.id;  
   }
   async getAllProductDispo(){
    this.productService.getAllProductByActive(true).subscribe((data) => {
      this.products = data;

    });
   }

    sleep(nb:number) {
    return new Promise<void>((resolve,reject)=>{
      setTimeout(()=>resolve(),nb);
    });
  }
  onRetour(){
    this.router.navigateByUrl("/myRequestTransfert");
  }
  }
   