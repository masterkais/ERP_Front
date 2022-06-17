import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
initial:boolean=false;
error:boolean=false;
loaded:boolean=true;
chargement:boolean=false;
  constructor() { 
  }
  ngOnInit(): void {
  }
}
