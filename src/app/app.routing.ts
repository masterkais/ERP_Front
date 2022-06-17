import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginUserComponent } from './Authentification/login-user/login-user.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes =[
  /*{
    path: 'user/login',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, */{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module')
      .then(m => m.AdminLayoutModule),canActivate:[AuthGuard]
    }]
  },
  {
    path: 'user/login',
    component:LoginUserComponent
  },
  {
    path: 'user/logout',
    component:LoginUserComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
