import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vehicule-nav-bar',
  templateUrl: './vehicule-nav-bar.component.html',
  styleUrls: ['./vehicule-nav-bar.component.css']
})
export class VehiculeNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onNewVehicule(){
 this.router.navigateByUrl("/vehicule/add-vehicule");
  }
}
