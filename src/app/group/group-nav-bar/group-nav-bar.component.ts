import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'app/shared/models/group.model';
import { GroupService } from 'app/shared/services/group.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'group-nav-bar',
  templateUrl: './group-nav-bar.component.html',
  styleUrls: ['./group-nav-bar.component.css']
})
export class GroupNavBarComponent implements OnInit {
  groups?:Group[]
  constructor(private router:Router,private userService:UserService,private groupService:GroupService) { }

  ngOnInit(): void {
  
  }
  getAllUsers(){

  }
  onNewGroup(){
    this.router.navigateByUrl("/group/add-group")
  }
  onSearch(form:any){
  }
}