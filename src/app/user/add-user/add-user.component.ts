import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/shared/models/group.model';
import { User } from 'app/shared/models/user.module';
import { GroupService } from 'app/shared/services/group.service';
import { UserService } from 'app/shared/services/user.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  listGroups: Group[];
  isUpdated: boolean = false;
  ids: Group[] = [];
  user: User;
  date: Date;
  selectedOptions: any = {};
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private groupService: GroupService,
    private userService: UserService,
    private toast:NgToastService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      firstName: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      lastName: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      city: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      userName: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      dateNaissanced: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      password: ["", Validators.compose([Validators.required,Validators.minLength(4)])],
      email: ["", Validators.compose([Validators.required,Validators.minLength(5)])],
      adress: ["", Validators.compose([Validators.required,Validators.minLength(3)])],
      numTel: ["", Validators.compose([Validators.required,Validators.minLength(8),,Validators.maxLength(8)])],
    });
    this.groupService.getAllGroup().subscribe((groups) => {
      this.listGroups = groups;
    });
  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.ids.push({ id: event.source.value.id,privileged:""});
      } else {
        console.log(event.source.value);
        this.removeGroup(event.source.value);
      }
    }
  }
  
  removeGroup(group: Group): void { 
    this.ids= this.ids.filter(({ id }) => id !== group.id);        
  }
  onSaveUser() {
    this.submitted = true;
    
    const myDate = this.userFormGroup.value.dateNaissanced;
    var maDate = this.datePipe.transform(myDate, "yyyy-MM-ddT14:20:29");
    let data: User = {
      id:null,
      firstName: this.userFormGroup.value.firstName,
      lastName: this.userFormGroup.value.lastName,
      login: this.userFormGroup.value.userName,
      password: this.userFormGroup.value.password,
      dateNaissanced: maDate,
      dateCreated: new Date(),
      adress: this.userFormGroup.value.adress,
      fax: this.userFormGroup.value.numTel,
      email: this.userFormGroup.value.email,
      city: this.userFormGroup.value.city,
      picture: null,
      active: true,
      groupIds: this.ids,
    };
    this.userService.saveUser(data).subscribe(() => {
      this.toast.success({detail:"Ajout avec succée !",duration:5000});
      this.router.navigateByUrl('/user');
    },error => this.toast.error({detail:"Error ! "+error.message,duration:5000}));
  }

}
