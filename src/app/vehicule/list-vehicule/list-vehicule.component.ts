import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SiteStock } from 'app/shared/models/siteStock.model';
import { Vehicule } from 'app/shared/models/vehicule.model';
import { DialogService } from 'app/shared/services/dialog.service';
import { SiteStockService } from 'app/shared/services/siteStock.service';
import { VehiculeService } from 'app/shared/services/vehicule.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.css']
})


export class ListVehiculeComponent implements OnInit {
  displayedColumns: string[] = [
    "lable",
    "serialNumber",
    "datePurchase",
    "state",
    "Action",
  
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Vehicule>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vehicules?: Vehicule[] = [];
  vehicule?: Vehicule;
  search: any;
  selection: any[];
  ids: Vehicule[] = [];
  constructor(
    private serviceVehicule:VehiculeService,
    private router: Router,
    private dialogService: DialogService,
    private toast: NgToastService,
  ) {
  }
  ngOnInit(): void {
    this.getAllVehicules();
  }
  getAllVehicules() {
    this.serviceVehicule.getAllVehicule().subscribe((vehicules) => {
      this.vehicules = vehicules;
      this.dataSource = new MatTableDataSource(vehicules);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(vehicules));
    });
  }

 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(vehicule:Vehicule) {
    this.router.navigateByUrl("vehicule/edit-vehicule/" + vehicule.id);
    this.toast.info({
      detail: "Affectez des modification !",
      duration: 5000,
    });
  }
  onDelete(vehicule:Vehicule) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviceVehicule.deleteVehiculeById(vehicule.id).subscribe(() => {
            this.getAllVehicules();
            this.toast.success({
              detail: "Suppression vehicule avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  onActive(vehicule:Vehicule) {
        vehicule.state = true;
        this.serviceVehicule.editVehicule(vehicule).subscribe((res) => {
          this.toast.success({
            detail: "vehicule est en mode active !",
            duration: 5000,
          });
          this.getAllVehicules();
        });
  }
  onDesactive(vehicule:Vehicule) {
    vehicule.state = false;
    this.serviceVehicule.editVehicule(vehicule).subscribe((res) => {
      this.toast.success({
        detail: "vehicule est inactive !",
        duration: 5000,
      });
      this.getAllVehicules();
    });
  }
  
  }
  