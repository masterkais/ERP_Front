import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from 'app/shared/models/caddy.model';
import { AuthentificationServiceService } from 'app/shared/services/authentification-service.service';
import { CaddyService } from 'app/shared/services/caddy.service';

@Component({
  selector: 'nav-bar-caddy',
  templateUrl: './nav-bar-caddy.component.html',
  styleUrls: ['./nav-bar-caddy.component.css']
})
export class NavBarCaddyComponent implements OnInit {
caddy:Caddy;
  constructor(public caddyService:CaddyService,private authService:AuthentificationServiceService,private router:Router) { }

  ngOnInit(): void {
    if(!this.authService.isLogged)
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCaddy();
    console.log(this.caddy);
  }
  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }
  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
    console.log("je suis la "+this.caddyService.currentCaddyName);
  }
}
