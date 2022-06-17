import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user.module";

@Injectable({
  providedIn: "root",
})
export class StatistiqueService {
  host = environment.host;
  constructor(private http: HttpClient) {}

  getNumberOfProductEnAtente():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertAttente").toPromise();
  }
  getNumberOfStock():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberSiteStock").toPromise();
  }
  getNumberOfNumberSiteStockDisponible():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberSiteStockDisponible").toPromise();
  }
  getNumberOfSiteStockNonDisponible():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberSiteStockNonDisponible").toPromise();
  }
  getNumberOfProductBySiteSock(id:number):Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProductBySiteSock/"+id).toPromise();
  }
  getNumberOfProduct():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProduct").toPromise();
  }
  getNumberOfProductPromo():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProductPromo").toPromise();
  }
  getNumberOfProductNomPromo():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProductNomPromo").toPromise();
  }
  getNumberOfProductActive():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProductActive").toPromise();
  }
  getNumberOfProductNonActive():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberProductNonActive").toPromise();
  }
  getNumberOfRequestTransfert():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfert").toPromise();
  }
  getNumberOfRequestTransfertEmpty():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertEmpty").toPromise();
  }
  getNumberOfRequestTransfertAttente():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertAttente").toPromise();
  }
  getNumberOfRequestTransfertAccepted():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertAccepted").toPromise();
  }
  getNumberOfRequestTransfertDelyvred():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertDelyvred").toPromise();
  }
  getNumberOfRequestTransfertByInventoryManager():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertByInventoryManager").toPromise();
  }
  getNumberOfRequestTransfertByDate():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberRequestTransfertByDate").toPromise();
  }
  getNumberOfVehicule():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberVehicule").toPromise();
  }
  getNumberOfVehiculeDisponible():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberVehiculeDisponible").toPromise();
  }
  getNumberOfVehiculeNonDisponible():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberVehiculeNonDisponible").toPromise();
  }
  getNumberOfClient():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberClient").toPromise();
  }
  getNumberOfInvetoryManager():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberInvetoryManager").toPromise();
  }
  getNumberOfPurchasingManager():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/PurchasingManager").toPromise();
  }
  getPOfnumberAdmin():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/numberAdmin").toPromise();
  }
  getNumberOfDelivery():Promise<User>{
    return this.http.get<User>(this.host+"/statistique/numbeDelivery").toPromise();
  }
  getNumberOfsalesOrder():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/salesOrder").toPromise();
  }
  getNumberOfsalesOrderByClient(id:number):Promise<number> {
    return this.http.get<number>(this.host + "/statistique/salesOrderByClient/"+id).toPromise();
  }
  getNumberOfsalesByPrchasingManager(id:number):Promise<number> {
    return this.http.get<number>(this.host + "/statistique/salesByPrchasingManager/"+id).toPromise();
  }
  getTotalVenteByCurrentDay():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getTotalVenteByCurrentDay").toPromise();
  }
  getNumberOfsalesByCurrentDay():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getNumberCommandeByCurrentDay").toPromise();
  }
  getTotalVenteByCurrentWeek():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getTotalVenteByCurrentWeek").toPromise();
  }
  getNumberOfsalesByCurrentWeek():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getNumberCommandeByCurrentWeek").toPromise();
  }
  getTotalVenteByCurrentMonth():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getTotalVenteByCurrentMonth").toPromise();
  }
  getNumberOfsalesByCurrentMonth():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getNumberCommandeByCurrentMonth").toPromise();
  }
  getNumberOfCategory():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getNumberCategory").toPromise();
  }
  getNumberOfBrand():Promise<number> {
    return this.http.get<number>(this.host + "/statistique/getNumberBrand").toPromise();
  }
  getTotalVenteBy6MonthS1(): Promise<number> {
    return this.http
      .get<number>(this.host + "/statistique/getTotalVenteBy6MonthS1")
      .toPromise();
  }
  getTotalVenteBy6MonthS2(): Promise<number> {
    return this.http
      .get<number>(this.host + "/statistique/getTotalVenteBy6MonthS2")
      .toPromise();
  }
  getNumberProductsByCategorieV2(): Promise<number> {
    return this.http
      .get<number>(this.host + "/statistique/getNumberProductsByCategorieV2")
      .toPromise();
  }
  getNumberProductsByStockV2(): Promise<number> {
    return this.http
      .get<number>(this.host + "/statistique/getNumberProductsByStockV2")
      .toPromise();
  }

}
