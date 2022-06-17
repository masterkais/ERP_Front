import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { Image } from "app/shared/models/image.model";
import { CategoryService } from "app/shared/services/category.service";
import { ImageService } from "app/shared/services/image.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  imageFormGroup?: FormGroup;
  submitted: boolean = false;
  images = new FormControl();
  image: Image;
  state;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private imageService:ImageService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imageFormGroup = this.formBuilder.group({
      path: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  onSaveImage() {
    this.submitted = true;
    let data: Image = {
      id: null,
      data: this.imageFormGroup.value.path,
  
    };
    this.imageService.saveImage(data).subscribe(
      () => {
        this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
        this.router.navigateByUrl("/image");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}

