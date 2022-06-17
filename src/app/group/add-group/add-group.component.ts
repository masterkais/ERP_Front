import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/shared/models/group.model';
import { GroupService } from 'app/shared/services/group.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  group:Group;
  date: Date;
  selectedOptions: any = {};
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private groupService: GroupService,
    private toast:NgToastService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.groupFormGroup = this.formBuilder.group({
      privileged: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
       });
 
  }

 
  onSaveGroup() {
    this.submitted = true;
    let data: Group = {
      id:null,
      privileged: this.groupFormGroup.value.privileged,
       };
    this.groupService.saveGroup(data).subscribe(() => {
      this.toast.success({detail:"Ajout avec succée !",duration:5000});
      this.router.navigateByUrl('/group');
    },error => this.toast.error({detail:"Error ! "+error.message,duration:5000}));
  }

}
