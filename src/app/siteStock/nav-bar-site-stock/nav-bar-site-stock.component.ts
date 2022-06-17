import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-site-stock',
  templateUrl: './nav-bar-site-stock.component.html',
  styleUrls: ['./nav-bar-site-stock.component.css']
})
export class NavBarSiteStockComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onNewSiteStock(){
    this.router.navigateByUrl("/siteStock/add-siteStock")
  }
}
