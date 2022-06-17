import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { LineRequestTransfert } from "../models/lineRequestTransfert.model";
import { LineRequestTransfertDetail } from "../models/lineRequestTransfertDetail.model";

@Injectable({
  providedIn: "root",
})
export class LineRequestTransfertService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllLineRequestTransfert(): Observable<LineRequestTransfert[]> {
    return this.http.get<LineRequestTransfert[]>(this.host + "/transfertLine/transfertLines");
  }

  deleteLineRequestTransfert(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/transfertLine/delete/" + id);
  }
  addLineToRequestTransfert(LineRequestTransfert:LineRequestTransfert): Observable<LineRequestTransfert> {
    return this.http.post<LineRequestTransfert>(this.host + "/transfertLine/addLineToRequestTransfert", LineRequestTransfert);
  }
  getRequestRfertLineById(id: number): Observable<LineRequestTransfert> {
    return this.http.get<LineRequestTransfert>(this.host + "/transfertLine/" + id);
  }
  public getAllLineRequestTransfertByIdRequest(idRequest:number): Observable<LineRequestTransfert[]> {
    return this.http.get<LineRequestTransfert[]>(this.host + "/transfertLine/transfertLines/TransfertLinesByRequestId/"+idRequest);
  }
  public getAllLineRequestTransfertByIdRequestWithPromise(idRequest:number): Promise<LineRequestTransfert[]> {
    return this.http.get<LineRequestTransfert[]>(this.host + "/transfertLine/transfertLines/TransfertLinesByRequestId/"+idRequest).toPromise();
  }
  public findAllTransfertLineDetaiByIdLineTransfert(idLineTransfert:number): Promise<LineRequestTransfertDetail> {
    return this.http.get<LineRequestTransfertDetail>(this.host + "/transfertLine/transfertLines/transfertLinesDetails/"+idLineTransfert).toPromise();
  }
  acceptLineRequestTransfert( transfertLineId:number,productIds:number[]): Promise<LineRequestTransfert> {
    let httpParams = new HttpParams()
    .append("transfertLineId",transfertLineId )
    .append("productIds",productIds.join(', '))
    return this.http.post<LineRequestTransfert>(this.host + "/transfertLine/acceptLineRequestTransfert", httpParams).toPromise();
  }
  acceptLineRequestTransfertEntry( transfertLineId:number,productIds:number[]): Promise<LineRequestTransfert> {
    let httpParams = new HttpParams()
    .append("transfertLineId",transfertLineId )
    .append("productIds",productIds.join(', '))
    return this.http.post<LineRequestTransfert>(this.host + "/transfertLine/acceptLineRequestTransfertEntry", httpParams).toPromise();
  }
  rejectLineRequestTransfert( transfertLineId:number): Observable<LineRequestTransfert> {
    let httpParams = new HttpParams()
    .append("transfertLineId",transfertLineId );
    return this.http.post<LineRequestTransfert>(this.host + "/transfertLine/rejectLineRequestTransfert", httpParams);
  }
  public getAllLineRequestTransfertByIdRequestV2(idRequest:number): Promise<LineRequestTransfert[]> {
    return this.http.get<LineRequestTransfert[]>(this.host + "/transfertLine/transfertLines/TransfertLinesByRequestId/"+idRequest).toPromise();
  }
  public findAllTransfertLineDetaiByIdLineTransfertV2(idLineTransfert:number): Promise<LineRequestTransfertDetail> {
    return this.http.get<LineRequestTransfertDetail>(this.host + "/transfertLine/transfertLines/transfertLinesDetailsV1/"+idLineTransfert).toPromise();
  }
}
