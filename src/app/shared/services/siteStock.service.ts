import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { SiteStock } from "../models/siteStock.model";

@Injectable({
  providedIn: "root",
})
export class SiteStockService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllSiteStock(): Observable<SiteStock[]> {
    return this.http.get<SiteStock[]>(this.host + "/siteStock/siteStocks");
  }

  deleteSiteStockById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/siteStock/delete/" + id);
  }
  saveSiteStock(siteStock:SiteStock): Observable<SiteStock> {
    return this.http.post<SiteStock>(this.host + "/siteStock", siteStock);
  }
  getSiteStockById(id: number): Observable<SiteStock> {
    return this.http.get<SiteStock>(this.host + "/siteStock/" + id);
  }
  getSiteStockByName(name: string): Promise<SiteStock> {
    return this.http.get<SiteStock>(this.host + "/siteStock/name/" + name).toPromise();
  }
  editSiteStock(siteStock:SiteStock): Observable<SiteStock> {
    return this.http.put<SiteStock>(this.host + "/siteStock", siteStock);
  }
  public getAllSiteStockV2(): Promise<SiteStock[]> {
    return this.http.get<SiteStock[]>(this.host + "/siteStock/siteStocks").toPromise();
  }
}
