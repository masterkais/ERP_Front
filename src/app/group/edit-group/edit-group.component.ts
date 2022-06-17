import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/shared/models/group.model';
import { GroupService } from 'app/shared/services/group.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  groupFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  group:Group;
  date: Date;
  selectedOptions: any = {};
  idGroup?:number;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private groupService: GroupService,
    private toast:NgToastService,
    private router:Router
  ) {
    this.idGroup=this.activatedRoot.snapshot.params.id
  }

  ngOnInit(): void {
    this.groupService.getGroupById(this.idGroup).subscribe((data)=>{
      this.group=data;
    })
    this.groupFormGroup = this.formBuilder.group({
      privileged: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
       });
 
  }

 
  onUpdateGroup() {
    this.submitted = true;
    if (!this.groupFormGroup.valid) return;
    let data: Group = {
      id:this.idGroup,
      privileged: this.groupFormGroup.value.privileged,
       };
    this.groupService.editGroup(data).subscribe(() => {
      this.toast.success({detail:"Modification avec succée !",duration:5000});
      this.router.navigateByUrl('/group');
    },error => this.toast.error({detail:"Error ! "+error.message,duration:5000}));
  }

}
