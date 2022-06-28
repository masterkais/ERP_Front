import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ActivatedRoute, Router } from "@angular/router";
import { Brand } from "app/shared/models/brand.model";
import { Category } from "app/shared/models/category.model";
import { Image } from "app/shared/models/image.model";
import { Product } from "app/shared/models/product.model";
import { RowMaterial } from "app/shared/models/rowMaterial.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { BrandService } from "app/shared/services/brand.service";
import { CategoryService } from "app/shared/services/category.service";
import { ImageService } from "app/shared/services/image.service";
import { ProductService } from "app/shared/services/product.service";
import { RowMaterialService } from "app/shared/services/rowMaterial.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { FileUploadService } from "app/shared/services/upload.service";
import { NgToastService } from "ng-angular-popup";
import { Observable } from "rxjs";

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  id: any;
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  product: Product;
  state;
  promotion;
  listImages: Image[];
  imagesSelected: any[] = [];
  imagesIds: number[];
  listCategory: Category[];
  listSieStock: SiteStock[];
  category: Category;
  siteStock: SiteStock;
  idProd:number;
  selectedOption = '1';
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router,
    private imageService: ImageService,
    private siteStockService: SiteStockService,
    private rowMaterialService: RowMaterialService,
    private productService: ProductService,
    private uploadService: FileUploadService,
    private httpClient:HttpClient,
    private activateRoute:ActivatedRoute,
  ) {
    this.idProd=this.activateRoute.snapshot.params.id;
  }
  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
      
  async ngOnInit(): Promise<void> {
    await this.productService.getProductByIdV2(this.idProd).then((data)=>{
      this.product=data;
    })
    this.categoryService.getAllCategory().subscribe((data) => {
      this.listCategory = data;
    });
    this.siteStockService.getAllSiteStock().subscribe((data) => {
      this.listSieStock = data;
    });

    this.imageService.getAllImage().subscribe((data) => {
      this.listImages = data;
    });
    this.productFormGroup = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      sellingPrice: ["", Validators.compose([Validators.required])],
      buyingPrice: ["", Validators.compose([Validators.required])],
    });
  }
  getSiteStockVal(row: SiteStock) {
    this.siteStock = row;
    console.log("******** site" + row.id);
  }
  getCategoryVal(row: Category) {
    this.category = row;
    console.log("******** cat" + row.id);
  }
  radioChange(event: MatRadioChange) {
    this.state = event.value;
    console.log(event.value);
  }
  radioChangePromotion(event: MatRadioChange) {
    this.promotion = event.value;
    console.log(event.value);
  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.imagesSelected.push(event.source.value.id);
      } else {
        console.log(event.source.value);
        this.removeImage(event.source.value);
      }
    }
  }

  removeImage(image: Image): void {
    this.imagesSelected = this.imagesSelected.filter(
      ({ id }) => id !== image.id
    );
  }
  onSaveProduct() {
    this.submitted = true;
    let data: Product = {
      id: null,
      name: this.productFormGroup.value.name,
      description: this.productFormGroup.value.description,
      sellingPrice: this.productFormGroup.value.sellingPrice,
      buyingPrice: this.productFormGroup.value.buyingPrice,
      state: this.state,
      active: this.promotion,
      imagesIds: this.imagesSelected,
      categoryId: this.category.id,
      siteStockId: this.siteStock.id,
      quantity:null
    };
    this.productService.saveProduct(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/product");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }

  urls = new Array<string>();
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
   
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          console.log("**********"+e.target.result)
        
          let image:Image={
            id:null,data:e.target.result
          }
          this.imageService.saveImage(image).subscribe((data)=>{
            this.imagesSelected.push(data.id);
          })
        }
        reader.readAsDataURL(file);
      }
    }
    
  }

  


}

