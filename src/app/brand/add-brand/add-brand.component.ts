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
  selector: 'add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  categoryFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  brand: Brand;
  state;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private brandService:BrandService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  onSaveBrand() {
    this.submitted = true;
    let data: Brand = {
      id: null,
      name: this.categoryFormGroup.value.name,
      description: this.categoryFormGroup.value.description,
    };
    this.brandService.saveBrand(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/brand");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}

