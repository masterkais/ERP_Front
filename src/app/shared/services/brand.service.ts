import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Brand } from "../models/brand.model";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.host + "/brand/brands");
  }

  deleteBrandById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/brand/delete/" + id);
  }
  saveBrand(brand:Brand): Observable<Brand> {
    return this.http.post<Brand>(this.host + "/brand", brand);
  }
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(this.host + "/brand/" + id);
  }
  editBrand(brand:Brand): Observable<Brand> {
    return this.http.put<Brand>(this.host + "/brand", brand);
  }
}
