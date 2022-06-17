import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'nav-bar-brand',
  templateUrl: './nav-bar-brand.component.html',
  styleUrls: ['./nav-bar-brand.component.css']
})
export class NavBarBrandComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onNewBrand(){
this.router.navigateByUrl("/brand/add-brand");
  }

}
