import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-category',
  templateUrl: './nav-bar-category.component.html',
  styleUrls: ['./nav-bar-category.component.css']
})
export class NavBarCategoryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onNewCategory(){
this.router.navigateByUrl("/category/add-category");
  }
}
