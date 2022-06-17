import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthentificationServiceService } from "app/shared/services/authentification-service.service";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "login-user",
  templateUrl: "./login-user.component.html",
  styleUrls: ["./login-user.component.css"],
})
export class LoginUserComponent implements OnInit {
  mode: number = 0;
  constructor(
    private authService: AuthentificationServiceService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {}
  onLogin(dataForm: any) {
    this.authService.login(dataForm).subscribe(
      (resp) => {
        let jwt = resp.headers.get("Authorization");
        this.router.navigateByUrl("/user");
        this.authService.saveToken(jwt);
        this.toast.success({detail:"Success Message",summary:"Athentification avec succées"})
        this.router.navigateByUrl("/user");
      },
      (err) => {
        this.toast.error({detail:"Error Message",summary:"Athentification est erroné ! Verifier vos cordonneés !",duration:5000})
      }
    );
  }
}
