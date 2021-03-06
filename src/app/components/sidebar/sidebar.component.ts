import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'Utilisateurs',  icon:'group', class: '' },
    { path: '/group', title: 'Groups',  icon:'group_work', class: '' },
    { path: '/siteStock', title: 'Stocks',  icon:'dns', class: '' },
    { path: '/category', title: 'Categories',  icon:'branding_watermark', class: '' },
    { path: '/product', title: 'Products',  icon:'event_available', class: '' },
    { path: '/vehicule', title: 'Vehicules',  icon:'directions_car', class: '' },
    { path: '/brand', title: 'Marques',  icon:'control_camera', class: '' },
    { path: '/myRequestTransfert', title: 'Mes DemandesTransfert',  icon:'assignment', class: '' },
    { path: '/requestTransfert/product-requestTransfert', title: 'Magasin Produit',  icon:'find_in_page', class: '' },
    { path: '/requestTransfert/category-requestTransfert', title: 'Magasin Category',  icon:'favorite', class: '' },
    { path: '/sales', title: 'Commandes',  icon:'assignment', class: '' },
    { path: '/sales', title: 'Commandes',  icon:'assignment', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
