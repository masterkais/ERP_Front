import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Group } from "app/shared/models/group.model";
import { User } from "app/shared/models/user.module";
import { DialogService } from "app/shared/services/dialog.service";
import { GroupService } from "app/shared/services/group.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"],
})
export class ListUserComponent implements OnInit {
  listGroups: Group[];
  isDeleted: boolean = false;
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "login",
    "email",
    "adress",
    "fax",
    "city",
    "dateNaissanced",
    "active",
    "group",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<User>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  groups?: any[] = [];
  group?: Group;
  dateNess: string;
  jj: string; mm: string; yyyy: string;
  splitted: string[];
  users: User[];
  search: any;
  selection: any[];
  ids: Group[] = [];
  constructor(
    private serviceUser: UserService,
    private serviceGroup: GroupService,
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private groupService: GroupService,
    private toast: NgToastService
  ) {
    this.groupService.getAllGroup().subscribe((groups) => {
      this.listGroups = groups;
    });
  }
  ngOnInit(): void {
    this.isDeleted = false;
    this.getAllUser();
  }
  getAllUser() {
    this.serviceUser.getAllUser().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllUserActive() {
    this.serviceUser.getAllUserActive().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllUserNoActive() {
    this.serviceUser.getAllUserNoActive().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilterGroup(group: Group) {
    this.serviceUser
      .getUsersByPrivilege(group.privileged)
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(user: User) {
    this.router.navigateByUrl("/user/edit-user/" + user.id);
    this.toast.info({
      detail: "Il faut confirmer le mot de passe pour editer !",
      duration: 5000,
    });
  }
  onDelete(user: User) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviceUser.deleteUserById(user.id).subscribe(() => {
            this.getAllUser();
            this.toast.success({
              detail: "Suppression utilisateur avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  onActive(user: User) {
    this.serviceUser.verifierUserNameExiste(user.login).subscribe((res) => {
      if (res != null) {
        user.active = true;
        this.serviceUser.editUser(user).subscribe((res) => {
          this.toast.success({
            detail: "Utilisateur est en mode active !",
            duration: 5000,
          });
          this.getAllUser();
        });
      }
    });
  }
  onDesactive(user: User) {
    this.serviceUser.verifierUserNameExiste(user.login).subscribe((res) => {
      if (res != null) {
        res.active = false;
        this.serviceUser.editUser(res).subscribe((res) => {
          this.toast.success({
            detail: "Utilisateur est en mode inactive !",
            duration: 5000,
          });
          this.getAllUser();
        });
      }
    });
  }
  formaterDate(date) {
    if (date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
  }
}
