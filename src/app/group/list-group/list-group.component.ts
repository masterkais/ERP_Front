import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Group } from 'app/shared/models/group.model';
import { DialogService } from 'app/shared/services/dialog.service';
import { GroupService } from 'app/shared/services/group.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  isDeleted: boolean = false;
  displayedColumns: string[] = [
    "privileged",
    "Action",
  
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Group>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  groups?: Group[] = [];
  group?: Group;
  search: any;
  selection: any[];
  ids: Group[] = [];
  constructor(
    private serviceGroup: GroupService,
    private router: Router,
    private dialogService: DialogService,
    private groupService: GroupService,
    private toast: NgToastService
  ) {
  }
  ngOnInit(): void {
    this.isDeleted = false;
    this.getAllGroup();
  }
  getAllGroup() {
    this.serviceGroup.getAllGroup().subscribe((groups) => {
      this.groups = groups;
      this.dataSource = new MatTableDataSource(groups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(groups));
    });
  }

 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(group:Group) {
    this.router.navigateByUrl("/group/edit-group/" + group.id);
    this.toast.info({
      detail: "Vous pouvez modifier !",
      duration: 5000,
    });
  }
  onDelete(group:Group) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviceGroup.deleteGroupById(group.id).subscribe(() => {
            this.getAllGroup();
            this.toast.success({
              detail: "Suppression group avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  
  }
  

