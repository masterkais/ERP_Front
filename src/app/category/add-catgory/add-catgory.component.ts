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
  selector: "add-catgory",
  templateUrl: "./add-catgory.component.html",
  styleUrls: ["./add-catgory.component.css"],
})
export class AddCatgoryComponent implements OnInit {
  categoryFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  category: Category;
  state;
  listBrands:Brand[];
  brand:Brand;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router,
    private brandServices:BrandService
  ) {}

  ngOnInit(): void {
    this.brandServices.getAllBrand().subscribe((datas)=>{
      this.listBrands=datas;
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
  console.log("****"+brand.id);
 }
  onSaveCategory() {
    this.submitted = true;
    let data: Category = {
      id: null,
      name: this.categoryFormGroup.value.name,
      description: this.categoryFormGroup.value.description,
      idBrand:this.brand.id
    };
    this.categoryService.saveCategory(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/category");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
