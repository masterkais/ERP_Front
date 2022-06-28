import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { lineSales } from "../models/lineSale.model";
import { RequestTransfert } from "../models/requestTransfert.model";
import { sale } from "../models/sale.model";

@Injectable({
  providedIn: "root",
})
export class RequestTransfertService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllRequestTransfert(): Observable<RequestTransfert[]> {
    return this.http.get<RequestTransfert[]>(this.host + "/requestTransfert/requestTransfers");
  }
  public getAllRequestTransfertByUser(userId:number): Observable<RequestTransfert[]> {
    return this.http.get<RequestTransfert[]>(this.host + "/requestTransfert/requestTransfers/"+userId);
  }
  public getAllSales(): Promise<sale[]> {
    return this.http.get<sale[]>(this.host + "/salesorder/sales").toPromise();
  }
  public getAllLineSales(id): Promise<lineSales> {
    return this.http.get<lineSales>(this.host + "/ligneSale/lines/"+id).toPromise();
  }
  deleteRequestTransfertById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/requestTransfert/delete/" + id);
  }
  
  getRequestTransfertById(id: number): Observable<RequestTransfert> {
    return this.http.get<RequestTransfert>(this.host + "/requestTransfert/" + id);
  }
  createNewEmptyRequestTransfert(inventaryManagerId:number,siteSourceName:string,siteDestinationName:string):Promise<any>{
    let httpParams = new HttpParams()
    .append("inventaryManagerId",inventaryManagerId )
    .append("siteDestinationName",siteDestinationName )
    .append("siteSourceName",siteSourceName );
    return this.http.post<RequestTransfert>(this.host + "/requestTransfert/createNewEmptyRequestTransfert",httpParams).toPromise(); 
  }
  submitRequestTransfert(requestTransfertId:number):Promise<any>{
    let httpParams = new HttpParams();
    httpParams.append("requestTransfertId",requestTransfertId);
    return this.http.post<RequestTransfert>(this.host+"/requestTransfert/submitRequestTransfert/"+requestTransfertId,null).toPromise();
  }
  deliverOrder(requestTransfertId:number,delivertManIds:number[],vehiculeIds:number[]):Promise<any>{
    let httpParams = new HttpParams()
    .append("requestTransfertId",requestTransfertId)
    .append("delivertManIds",delivertManIds.join(', '))
    .append("vehiculeIds",vehiculeIds.join(', '))
    return this.http.post<RequestTransfert>(this.host+"/requestTransfert/deliverOrder/",httpParams).toPromise();
  }
  getRequestTransfertByIdWithPromise(id: number): Promise<RequestTransfert> {
    return this.http.get<RequestTransfert>(this.host + "/requestTransfert/" + id).toPromise();
  }
  getTotalRequestById(id: number): Promise<number> {
    return this.http.get<number>(this.host + "/requestTransfert/montantTotal/" + id).toPromise();
  }
}
