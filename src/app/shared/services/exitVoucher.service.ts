import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ExitVoucher } from "../models/exitVoucher.model";

@Injectable({
  providedIn: "root",
})
export class ExitVoucherService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllExitVoucher(): Observable<ExitVoucher[]> {
    return this.http.get<ExitVoucher[]>(this.host + "/exitVoucher/exitVouchers");
  }

  deleteExitVoucherById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/exitVoucher/delete/" + id);
  }
  saveExitVoucher(category: ExitVoucher): Observable<ExitVoucher> {
    return this.http.post<ExitVoucher>(this.host + "/exitVoucher", category);
  }
  getExitVoucherById(id: number): Promise<ExitVoucher> {
    return this.http.get<ExitVoucher>(this.host + "/exitVoucher/" + id).toPromise();
  }

}
