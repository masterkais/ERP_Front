import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Brand } from "app/shared/models/brand.model";
import { Category } from "app/shared/models/category.model";
import { BrandService } from "app/shared/services/brand.service";
import { CategoryService } from "app/shared/services/category.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'edit-catgory',
  templateUrl: './edit-catgory.component.html',
  styleUrls: ['./edit-catgory.component.css']
})
export class EditCatgoryComponent implements OnInit {
  categoryFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  category: Category;
  state;
  idCategory:number;
  idBrand:number;
  brand:Brand;
  listBrands:Brand[];
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router,
    private brandService:BrandService,
  ) {
    this.idCategory=this.activatedRoot.snapshot.params.id;
  }

  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe((datas)=>{
      this.listBrands=datas;
    })
    this.categoryService.getCategoryById(this.idCategory).subscribe((data)=>{
      this.category=data;
    })
    this.categoryFormGroup = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  getBrand(brand:Brand){
    this.brand=brand;
   }
  onUpdateCategory() {
    this.submitted = true;
    let data: Category = {
      id: this.idCategory,
      name: this.categoryFormGroup.value.name,
      description: this.categoryFormGroup.value.description,
      idBrand:this.brand.id,
    };
    this.categoryService.editCategory(data).subscribe(
      () => {
        this.toast.success({ detail: "Modification avec succée !", duration: 5000 });
        this.router.navigateByUrl("/category");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
