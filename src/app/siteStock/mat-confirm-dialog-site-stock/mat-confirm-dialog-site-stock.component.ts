import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'app/user/mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'mat-confirm-dialog-site-stock',
  templateUrl: './mat-confirm-dialog-site-stock.component.html',
  styleUrls: ['./mat-confirm-dialog-site-stock.component.css']
})
export class MatConfirmDialogSiteStockComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

ngOnInit() {
}

closeDialog() {
  this.dialogRef.close(false);
}
}