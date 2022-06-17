import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user.module';
import { GroupService } from 'app/shared/services/group.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {
  users?:User[]
    constructor(private router:Router,private userService:UserService,private groupService:GroupService) { }
  
    ngOnInit(): void {
    
    }
    getAllUsers(){
    this.userService.getAllUser().subscribe((data)=>{
      this.users=data;
    });
    }
    onNewUser(){
      this.router.navigateByUrl("/user/add-user")
    }
    onSearch(form:any){
    }
  }
  