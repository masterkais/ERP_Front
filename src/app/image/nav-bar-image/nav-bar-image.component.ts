import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-image',
  templateUrl: './nav-bar-image.component.html',
  styleUrls: ['./nav-bar-image.component.css']
})
export class NavBarImageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
 onNewImage(){
   this.router.navigateByUrl("/image/add-image");
 }
}
