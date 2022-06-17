import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-quantity-request-transert',
  templateUrl: './dialog-quantity-request-transert.component.html',
  styleUrls: ['./dialog-quantity-request-transert.component.css']
})
export class DialogQuantityRequestTransertComponent implements OnInit {
 public quantity:number=0;
  constructor(
    public dialogRef: MatDialogRef<DialogQuantityRequestTransertComponent>
   
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
