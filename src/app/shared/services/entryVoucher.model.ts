import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { EntryVoucher } from "../models/entryVoucher.model";
import { ExitVoucher } from "../models/exitVoucher.model";

@Injectable({
  providedIn: "root",
})
export class EntryVoucherService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllEntryVoucher(): Observable<EntryVoucher[]> {
    return this.http.get<EntryVoucher[]>(this.host + "/entryVoucher/entryVouchers");
  }

  deleteEntryVoucherById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/entryVoucher/delete/" + id);
  }

  getEntryVoucherById(id: number): Promise<EntryVoucher> {
    return this.http.get<EntryVoucher>(this.host + "/entryVoucher/" + id).toPromise();
  }
  onNewEntryVoucher(reqId:number): Promise<EntryVoucher> {
    return this.http.get<EntryVoucher>(this.host + "/entryVoucher/newEntryVoucher/"+reqId).toPromise();
  }

}
