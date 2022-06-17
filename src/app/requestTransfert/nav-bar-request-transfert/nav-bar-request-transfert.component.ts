import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-request-transfert',
  templateUrl: './nav-bar-request-transfert.component.html',
  styleUrls: ['./nav-bar-request-transfert.component.css']
})
export class NavBarRequestTransfertComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  this.router.navigateByUrl("/myRequestTransfert");
  }
  addRequestTransfert(){
  this.router.navigateByUrl("/requestTransfert/category-requestTransfert");
  }
}
