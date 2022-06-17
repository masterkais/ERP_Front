import { Routes } from "@angular/router";
import { BasketComponent } from "app/basket/basket.component";
import { AddBrandComponent } from "app/brand/add-brand/add-brand.component";
import { BrandComponent } from "app/brand/brand.component";
import { EditBrandComponent } from "app/brand/edit-brand/edit-brand.component";
import { CaddyComponent } from "app/caddy/caddy.component";
import { AddCatgoryComponent } from "app/category/add-catgory/add-catgory.component";
import { CategoryComponent } from "app/category/category.component";
import { EditCatgoryComponent } from "app/category/edit-catgory/edit-catgory.component";
import { AddGroupComponent } from "app/group/add-group/add-group.component";
import { EditGroupComponent } from "app/group/edit-group/edit-group.component";
import { GroupComponent } from "app/group/group.component";
import { AddImageComponent } from "app/image/add-image/add-image.component";
import { ImageComponent } from "app/image/image.component";
import { AddProductComponent } from "app/product/add-product/add-product.component";
import { EditProductComponent } from "app/product/edit-product/edit-product.component";
import { ProductComponent } from "app/product/product.component";
import { CategoryssRequestTransertComponent } from "app/requestTransfert/categoryss-request-transert/categoryss-request-transert.component";
import { DeliverOrderRequestTransfertComponent } from "app/requestTransfert/deliver-order-request-transfert/deliver-order-request-transfert.component";
import { EntryVoucherComponent } from "app/requestTransfert/entry-voucher/entry-voucher.component";
import { ExitVoucherComponent } from "app/requestTransfert/exit-voucher/exit-voucher.component";
import { LineRequestTransfertEntryComponent } from "app/requestTransfert/line-request-transfert-entry/line-request-transfert-entry.component";
import { LineRequestTransfertComponent } from "app/requestTransfert/line-request-transfert/line-request-transfert.component";
import { ProductsRequestTransertComponent } from "app/requestTransfert/products-request-transert/products-request-transert.component";
import { RequestTransfertComponent } from "app/requestTransfert/request-transfert.component";
import { AddRowMaterialComponent } from "app/rowMaterial/add-row-material/add-row-material.component";
import { EditRowMaterialComponent } from "app/rowMaterial/edit-row-material/edit-row-material.component";
import { RowMaterialComponent } from "app/rowMaterial/row-material.component";
import { AddSiteStockComponent } from "app/siteStock/add-site-stock/add-site-stock.component";
import { EditSiteStockComponent } from "app/siteStock/edit-site-stock/edit-site-stock.component";
import { SiteStockComponent } from "app/siteStock/site-stock.component";
import { AddUserComponent } from "app/user/add-user/add-user.component";
import { EditUserComponent } from "app/user/edit-user/edit-user.component";
import { UserProfileComponent } from "app/user/user-profile/user-profile.component";


import { UserComponent } from "app/user/user.component";
import { AddVehiculeComponent } from "app/vehicule/add-vehicule/add-vehicule.component";
import { EditVehiculeComponent } from "app/vehicule/edit-vehicule/edit-vehicule.component";
import { VehiculeComponent } from "app/vehicule/vehicule.component";
import { DashboardComponent } from "../../dashboard/dashboard.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "user/edit-user/:id", component: EditUserComponent },
  { path: "user/add-user", component: AddUserComponent },
  { path: "user/profile/:id", component: UserProfileComponent },
  { path: "group", component: GroupComponent },
  { path: "group/edit-group/:id", component: EditGroupComponent },
  { path: "group/add-group", component: AddGroupComponent },
  { path: "siteStock", component: SiteStockComponent },
  { path: "siteStock/edit-siteStock/:id", component: EditSiteStockComponent },
  { path: "siteStock/add-siteStock", component: AddSiteStockComponent },
  { path: "vehicule", component: VehiculeComponent },
  { path: "vehicule/edit-vehicule/:id", component: EditVehiculeComponent },
  { path: "vehicule/add-vehicule", component: AddVehiculeComponent},
  { path: "category", component: CategoryComponent },
  { path: "category/edit-category/:id", component: EditCatgoryComponent },
  { path: "category/add-category", component: AddCatgoryComponent},
  { path: "image", component: ImageComponent },
  { path: "image/add-image", component: AddImageComponent},
  { path: "brand", component: BrandComponent },
  { path: "brand/edit-brand/:id", component: EditBrandComponent },
  { path: "brand/add-brand", component: AddBrandComponent},
  { path: "product", component: ProductComponent },
  { path: "product/edit-product/:id", component: EditProductComponent },
  { path: "product/add-product", component: AddProductComponent},

  { path: "requestTransfert/product-requestTransfert", component: ProductsRequestTransertComponent},
  { path: "requestTransfert/category-requestTransfert", component: CategoryssRequestTransertComponent},
  { path: "rowMatiere", component: RowMaterialComponent },
  { path: "rowMatiere/edit-rowMatiere/:id", component: EditRowMaterialComponent },
  { path: "rowMatiere/add-rowMatiere", component: AddRowMaterialComponent},
  { path: "caddy", component: CaddyComponent},
  { path: "basket", component: BasketComponent},
  { path: "myRequestTransfert", component: RequestTransfertComponent},
  { path: "requestTransfertLines/:id", component: LineRequestTransfertComponent},
  { path: "requestTransfert/deliverOrder/:id", component: DeliverOrderRequestTransfertComponent},
  { path: "requestTransfert/entryVoucher/:id", component:EntryVoucherComponent},
  { path: "requestTransfert/exitVoucher/:id", component:ExitVoucherComponent},
  { path: "requestTransfertLinesEntry/:id", component:LineRequestTransfertEntryComponent},

];
