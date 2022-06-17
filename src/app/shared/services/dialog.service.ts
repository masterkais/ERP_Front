import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from "app/user/mat-confirm-dialog/mat-confirm-dialog.component";


@Injectable({
    providedIn:'root'
})
export class DialogService{
    constructor(private dialog:MatDialog){}
    openConfirmDialog(msg){
        return this.dialog.open(MatConfirmDialogComponent,{
           data :{
             message : msg
           }
         });
       }
}