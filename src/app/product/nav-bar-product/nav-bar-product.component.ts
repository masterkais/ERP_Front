import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "nav-bar-product",
  templateUrl: "./nav-bar-product.component.html",
  styleUrls: ["./nav-bar-product.component.css"],
})
export class NavBarProductComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onNewProduct() {
    this.router.navigateByUrl("/product/add-product");
  }
}
