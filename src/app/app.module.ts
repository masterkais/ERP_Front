import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthenticationService } from "./shared/services/authentication.service";
import { GroupService } from "./shared/services/group.service";
import { MatFormFieldModule } from "@angular/material/form-field";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { DatePipe } from "@angular/common";
import { UserService } from "./shared/services/user.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from "@angular/material/paginator";
import { UserComponent } from './user/user.component';
import { UserNavBarComponent } from './user/user-nav-bar/user-nav-bar.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from "./user/list-user/list-user.component";
import { MatConfirmDialogComponent } from './user/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogService } from "./shared/services/dialog.service";
import { RegisterUserComponent } from './user/register-user/register-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginUserComponent } from "./Authentification/login-user/login-user.component";
import { InterceptorService, TokenInterceptorProvider } from "./shared/services/interceptor.service";
import { AuthentificationServiceService } from "./shared/services/authentification-service.service";
import { NgPopupsModule } from 'ng-popups';
import {NgToastModule} from "ng-angular-popup";
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { MatConfirmDialogGroupComponent } from './group/mat-confirm-dialog-group/mat-confirm-dialog-group.component';
import { GroupNavBarComponent } from './group/group-nav-bar/group-nav-bar.component';
import { SiteStockComponent } from "./siteStock/site-stock.component";
import { EditSiteStockComponent } from "./siteStock/edit-site-stock/edit-site-stock.component";
import { NavBarSiteStockComponent } from "./siteStock/nav-bar-site-stock/nav-bar-site-stock.component";
import { MatConfirmDialogSiteStockComponent } from "./siteStock/mat-confirm-dialog-site-stock/mat-confirm-dialog-site-stock.component";
import { AddSiteStockComponent } from "./siteStock/add-site-stock/add-site-stock.component";
import {MatRadioModule} from '@angular/material/radio';
import { ListSiteStockComponent } from './siteStock/list-site-stock/list-site-stock.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { VehiculeNavBarComponent } from './vehicule/vehicule-nav-bar/vehicule-nav-bar.component';
import { AddVehiculeComponent } from './vehicule/add-vehicule/add-vehicule.component';
import { EditVehiculeComponent } from './vehicule/edit-vehicule/edit-vehicule.component';
import { ListVehiculeComponent } from './vehicule/list-vehicule/list-vehicule.component';
import { CategoryComponent } from './category/category.component';
import { NavBarCategoryComponent } from './category/nav-bar-category/nav-bar-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { EditCatgoryComponent } from './category/edit-catgory/edit-catgory.component';
import { AddCatgoryComponent } from './category/add-catgory/add-catgory.component';
import { ImageComponent } from './image/image.component';
import { ListImageComponent } from './image/list-image/list-image.component';
import { AddImageComponent } from './image/add-image/add-image.component';
import { NavBarImageComponent } from './image/nav-bar-image/nav-bar-image.component';
import { BrandComponent } from './brand/brand.component';
import { NavBarBrandComponent } from './brand/nav-bar-brand/nav-bar-brand.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { EditBrandComponent } from './brand/edit-brand/edit-brand.component';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';
import { ProductComponent } from './product/product.component';
import { NavBarProductComponent } from './product/nav-bar-product/nav-bar-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { NavBarRowMaterialComponent } from './rowMaterial/nav-bar-row-material/nav-bar-row-material.component';
import { AddRowMaterialComponent } from './rowMaterial/add-row-material/add-row-material.component';
import { EditRowMaterialComponent } from './rowMaterial/edit-row-material/edit-row-material.component';
import { ListRowMaterialComponent } from './rowMaterial/list-row-material/list-row-material.component';
import { RowMaterialComponent } from "./rowMaterial/row-material.component";
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NavBarRequestTransfertComponent } from "./requestTransfert/nav-bar-request-transfert/nav-bar-request-transfert.component";
import { ProductListComponent } from "./requestTransfert/product-list/product-list.component";
import { RequestTransfertComponent } from "./requestTransfert/request-transfert.component";
import { CaddyComponent } from './caddy/caddy.component';
import { NavBarCaddyComponent } from './caddy/nav-bar-caddy/nav-bar-caddy.component';
import { ListCaddyComponent } from './caddy/list-caddy/list-caddy.component';
import { ListRequestTransertComponent } from './requestTransfert/list-request-transert/list-request-transert.component';
import { ProductsRequestTransertComponent } from './requestTransfert/products-request-transert/products-request-transert.component';
import { CategoryssRequestTransertComponent } from './requestTransfert/categoryss-request-transert/categoryss-request-transert.component';
import { DialogQuantityRequestTransertComponent } from './requestTransfert/dialog-quantity-request-transert/dialog-quantity-request-transert.component';
import { BasketComponent } from './basket/basket.component';
import { NavBarBasketComponent } from './basket/nav-bar-basket/nav-bar-basket.component';
import { ListBasketComponent } from './basket/list-basket/list-basket.component';
import { BasketService } from "./shared/services/Basket.service";
import { LineRequestTransfertService } from "./shared/services/lineRequestTransfert.service";
import { EmployerListRequestTransfertComponent } from './requestTransfert/employer-list-request-transfert/employer-list-request-transfert.component';
import { LineRequestTransfertComponent } from './requestTransfert/line-request-transfert/line-request-transfert.component';
import { DeliverOrderRequestTransfertComponent } from './requestTransfert/deliver-order-request-transfert/deliver-order-request-transfert.component';
import { EntryVoucherComponent } from './requestTransfert/entry-voucher/entry-voucher.component';
import { ExitVoucherComponent } from './requestTransfert/exit-voucher/exit-voucher.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { jsPDF } from 'jspdf';
import { LineRequestTransfertEntryComponent } from './requestTransfert/line-request-transfert-entry/line-request-transfert-entry.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { NgChartsModule as ChartsModule} from 'ng2-charts';

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { SalesComponent } from './sales/sales.component';
import { ListSalesComponent } from './sales/list-sales/list-sales.component';
import { NavbarSalesComponent } from './sales/navbar-sales/navbar-sales.component';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatRippleModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    NgToastModule,
    NgPopupsModule,
    MatRadioModule,
    NgxSpinnerModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
    FusionChartsModule,
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserComponent,
    UserNavBarComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    MatConfirmDialogComponent,
    RegisterUserComponent,
    LoginUserComponent,
    UserProfileComponent,
    GroupComponent,
    AddGroupComponent,
    EditGroupComponent,
    ListGroupComponent,
    MatConfirmDialogGroupComponent,
    GroupNavBarComponent,
    SiteStockComponent,
    EditSiteStockComponent,
    NavBarSiteStockComponent,
    MatConfirmDialogSiteStockComponent,
    AddSiteStockComponent,
    ListSiteStockComponent,
    VehiculeComponent,
    VehiculeNavBarComponent,
    AddVehiculeComponent,
    EditVehiculeComponent,
    ListVehiculeComponent,
    CategoryComponent,
    NavBarCategoryComponent,
    ListCategoryComponent,
    EditCatgoryComponent,
    AddCatgoryComponent,
    ImageComponent,
    ListImageComponent,
    AddImageComponent,
    NavBarImageComponent,
    BrandComponent,
    NavBarBrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    ListBrandComponent,
    ProductComponent,
    NavBarProductComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    NavBarRowMaterialComponent,
    AddRowMaterialComponent,
    EditRowMaterialComponent,
    ListRowMaterialComponent,
    RowMaterialComponent,
    RequestTransfertComponent,
    ProductListComponent,
    NavBarRequestTransfertComponent,
    CaddyComponent,
    NavBarCaddyComponent,
    ListCaddyComponent,
    ListRequestTransertComponent,
    ProductsRequestTransertComponent,
    CategoryssRequestTransertComponent,
    DialogQuantityRequestTransertComponent,
    BasketComponent,
    NavBarBasketComponent,
    ListBasketComponent,
    EmployerListRequestTransfertComponent,
    LineRequestTransfertComponent,
    DeliverOrderRequestTransfertComponent,
    EntryVoucherComponent,
    ExitVoucherComponent,
    LineRequestTransfertEntryComponent,
    SalesComponent,
    ListSalesComponent,
    NavbarSalesComponent,
  ],
  providers: [LineRequestTransfertService ,BasketService, AuthenticationService, GroupService,UserService,DatePipe,DialogService,InterceptorService,AuthentificationServiceService,TokenInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent,AddSiteStockComponent]
})
export class AppModule {}
